import * as express from 'express';
import {Request, Response, NextFunction} from 'express';

let router = express.Router();
const userModel = require("./userModel");
import utils from "../tools/utils";

interface userModelInstance {
	username: string;
	_id: string;
	password?: string;
}

router.use((req: Request, res: Response, next: NextFunction) => {
	console.log("请求的时间", Date.now());
	next();
});
/*用户登录接口，传人用户名和密码*/
router.post("/login", (req: Request, res: Response,) => {
	let loginData = req.body
	loginData.password = utils.genPassword(String(loginData.password))
	userModel
		.find(loginData)
		.then((result: Array<userModelInstance>) => {
			if (result.length > 0) {
				let userOBJ: userModelInstance = Object.create(result[0]);
				utils.setToken(userOBJ.username, userOBJ._id).then(token => {
					res.send({
						code: 200,
						user: {username: userOBJ.username, _id: userOBJ._id},
						message: '登录成功',
						token: token
					})
				})
			} else {
				res.send({
					code: 200,
					message: '登录失败，瓜怂',
				})
			}
		})
		.catch((err: object) => {
			console.error(err);
		});
});
/*用户注册接口，传入用户名和密码*/
router.get("/register", (req: Request, res: Response,) => {
	let resObj = {desc: "注册成功"};
	userModel
		.find({username: req.query.username})
		.then((result: Array<object>) => {
			if (result.length > 0) {
				resObj.desc = "用户名已存在";
				res.send(resObj);
			} else {
				const saveDate: Date = new Date();
				let registerData = req.query
				registerData.password = utils.genPassword(String(registerData.password))
				const saveModel = new userModel(
					Object.assign(registerData, {ctime: saveDate})
				);
				saveModel.save().then((result: object) => {
					res.send(result);
				});
			}
		})
		.catch((err: object) => {
			console.error(err);
		});
});
/*查询用户列表,可以传入对象参数做筛选*/
router.get('/getUserList', (req: Request, res: Response,) => {
	const filter = req.query
	userModel.find(filter).then((result: Array<userModelInstance>) => {
		res.send(result)
	}).catch((err: object) => {
		console.log(err)
	})
})
module.exports = router;
