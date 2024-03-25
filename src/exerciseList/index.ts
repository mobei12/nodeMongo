import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { findRecordsByUser, findAllRecords, saveRecord } from "./exerciseRecordModel";
/*扩展Express的Request参数*/
declare global {
	namespace Express {
		interface Request {
			user: {
				user_id?: string;
				user_name?: string;
				level?: number;
			};
		}
	}
}
type ExerciseRecord = {
	_id?: string;
	key?: string;
	ctime?: Date;
	[key: string]: any;
}
const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("请求的时间", Date.now());
	next();
});
/*根据用户id，查询运动信息*/
router.get("/find", (req: Request, res: Response) => {
	let { user_id } = req.user;
	if (req.query.user_id) {
		user_id = req.query.user_id as string;
	}
	findRecordsByUser({ user_id })
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
	findAllRecords(filter)
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
	const { user_id } = req.user;
	saveRecord(Object.assign(req.query, { ctime: saveDate, user_id })).then((result: object) => {
		res.send(result);
	}).catch((err: object) => {
		console.error(err);
	});
});
export default router;
