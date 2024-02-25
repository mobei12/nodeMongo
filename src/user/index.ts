import { Request, Response } from "express";

import { createAsyncRouter, methods } from "../tools/express";
import { genPassword, setToken } from "../tools/utils";
import { createUser, userFind, userFindAll } from './userModel';

type userModelInstance = {
	username: string;
	_id: string;
	password?: string;
}
const router = createAsyncRouter();
/*用户登录接口，传人用户名和密码*/

router.useAsync(methods.post, '/login', async (req: Request, res: Response) => {
	try {
		let loginData = req.body;
		loginData.password = genPassword(String(loginData.password));
		const result = await userFind(loginData);
		if (result !== null) {
			const { _id, username } = result
			const token = await setToken(username, _id)
			res.send({
				code: 200,
				user: { username, _id },
				message: "登录成功",
				token,
			})
		} else {
			res.send({
				code: 200,
				message: "登录失败",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error")
	}
});
/*用户注册接口，传入用户名和密码*/
router.useAsync(methods.get, '/register', async (req: Request, res: Response) => {
	try {
		const resObj = { desc: "注册成功" };
		const result: userModelInstance | null = await userFind({ username: req.query.username });
		if (result) {
			resObj.desc = "用户名已存在";
			res.send(resObj);
		} else {
			const saveDate: Date = new Date();
			let registerData = req.query;
			registerData.password = genPassword(String(registerData.password));
			const saveResult: object = await createUser(Object.assign(registerData, { ctime: saveDate }));
			res.send(saveResult);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
})

/*查询用户列表,可以传入对象参数做筛选*/
router.useAsync(methods.get, '/getUserList', async (req: Request, res: Response) => {
	try {
		const result: Array<userModelInstance> = await userFindAll(req.query);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
})


