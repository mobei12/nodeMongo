import * as express from "express";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

import { genPassword, setToken } from "../tools/utils";
import { createUser, userFind, userFindAll } from './userModel'

type userModelInstance = {
	username: string;
	_id: string;
	password?: string;
}
router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("请求的时间", Date.now());
	next();
});
/*用户登录接口，传人用户名和密码*/
router.post("/login", (req: Request, res: Response) => {
	let loginData = req.body;
	loginData.password = genPassword(String(loginData.password));
	userFind(loginData).then((result: userModelInstance) => {
		if (result !== null) {
			const { _id, username } = result
			setToken(username, _id).then(token => {
				res.send({
					code: 200,
					user: { username, _id },
					message: "登录成功",
					token: token,
				});
			});
		} else {
			res.send({
				code: 200,
				message: "登录失败",
			});
		}
	}).catch((err: object) => {
		console.error(err);
	})
});
/*用户注册接口，传入用户名和密码*/
router.get("/register", (req: Request, res: Response) => {
	let resObj = { desc: "注册成功" };
	console.log(req.query);
	userFind({ username: req.query.username }).then((result: userModelInstance) => {
		console.log(result);
		if (result) {
			resObj.desc = "用户名已存在";
			res.send(resObj);
		} else {
			const saveDate: Date = new Date();
			let registerData = req.query;
			registerData.password = genPassword(String(registerData.password));
			createUser(Object.assign(registerData, { ctime: saveDate })).then((result: object) => {
				res.send(result);
			})
		}
	}).catch((err: object) => {
		console.error(err);
	})
});
/*查询用户列表,可以传入对象参数做筛选*/
router.get("/getUserList", (req: Request, res: Response) => {
	console.log(req.query);
	userFindAll(req.query).then((result: Array<userModelInstance>) => {
		res.send(result);
	}).catch((err: object) => {
		console.log(err);
	})
});
export default router

