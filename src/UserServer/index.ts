import { Request, Response } from "express";

import { createAsyncRouter, methods } from "../tools/express";
import { genPassword, setToken,checkPermission } from "../tools/utils";
import { createUser, userFind, userFindAll } from './userModel';

type userModelInstance = {
	username: string;
	_id: string;
	level: number;
	password?: string;
}
const router = createAsyncRouter();
/*用户登录接口，传人用户名和密码*/

router.useAsync(methods.post, '/login', async (req: Request, res: Response) => {
	try {
		let loginData = req.body;
		loginData.password = genPassword(String(loginData.password));
		const result:userModelInstance | null = await userFind(loginData);
		if (result !== null) {
			const { _id, username,level=2 } = result
			const token = await setToken(username, _id,level)
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
router.useAsync(methods.post, '/register', async (req: Request, res: Response) => {
	try {
		let {username, password} = req.body;
		const resObj = { code: 200, message: "注册成功",id:"" };
		const _password = genPassword(String(password));
		const result: userModelInstance | null = await userFind({ username, password: _password });
		if (result) {
			resObj.message = "用户名已存在";
			res.send(resObj);
		} else {
			const saveDate: Date = new Date();
			const saveResult = await createUser(Object.assign({username,password:_password}, { level:0,ctime: saveDate }));//默认等级为0。等级越高，权限越高
			if(saveResult&&saveResult._id){
				resObj.id = saveResult._id
			}
			res.send(resObj);
		}
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
})

/*查询用户列表,可以传入对象参数做筛选*/
router.useAsync(methods.get, '/getUserList',checkPermission, async (req: Request, res: Response) => {
	try {
		const result: Array<userModelInstance> = await userFindAll(req.query);
		res.send(result);
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
})


export default router