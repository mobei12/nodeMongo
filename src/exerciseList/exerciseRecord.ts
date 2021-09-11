import * as express from "express";
import {Request, Response, NextFunction} from "express";
const exerciseRecordModel = require("./exerciseRecordModel");
/*扩展Express的Request参数*/
declare global {
	namespace Express {
		interface Request {
			user: {
				user_id?: string;
				user_name?: string;
			};
		}
	}
}
interface ExerciseRecord {
	_id?: string;
	key?: string;
	ctime?: Date;
	[key: string]: any;
}
let router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("请求的时间", Date.now());
	next();
});
/*根据用户id，查询运动信息*/
router.get("/find", (req: Request, res: Response) => {
	const {user_id} = req.user;
	exerciseRecordModel
		.find({user_id: user_id})
		.then((result: Array<object>) => {
			res.send(result);
		})
		.catch((err: object) => {
			console.error(err);
		});
});
/*查询所有运动信息*/
router.get("/findAll", (req: Request, res: Response, next) => {
	const filter = req.query;
	exerciseRecordModel
		.aggregate([
			{
				$addFields: {
					userId: {$convert: {input: "$user_id", to: "objectId"}},
					key: "$_id",
				},
			},
			{
				$lookup: {
					from: "user",
					localField: "userId",
					foreignField: "_id",
					as: "users",
				},
			},
			{$match: filter},
		])
		.then((result: Array<ExerciseRecord>) => {
			res.send(result);
		})
		.catch((err: object) => {
			console.error(err);
		});
});
/*存储运动记录*/
router.get("/saveRecord", (req: Request, res: Response) => {
	const saveDate: Date = new Date();
	const {user_id} = req.user;
	const saveModel = new exerciseRecordModel(
		Object.assign(req.query, {ctime: saveDate, user_id: user_id})
	);
	saveModel.save().then((result: object) => {
		res.send(result);
	});
});

module.exports = router;
