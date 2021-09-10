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
router.get("/findAll", (req: Request, res: Response) => {
	const filter = req.query;
	console.log(filter);
	exerciseRecordModel
		.find(filter)
		.then((result: Array<{_id: string; key: string}>) => {
			let newRe: {_id: string; key: string}[] = [];
			result.forEach((re: {_id: string; key: string}) => {
				newRe.push(Object.assign(re, {keu: re._id}));
			});
			res.send(newRe);
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
