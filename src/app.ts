"use strict";
import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
import dbTool from "./dbTool";
app.use(bodyParser.json()); //解析json类型的请求体
app.get("/user/login", (req, res) => {
	const loginParams = {
		username: String(req.query.username),
		password: String(req.query.password)
	};
	dbTool.userLogin(loginParams).then((result: object) => {
		res.send(result);
	});
});

app.get("/user/register", (req, res) => {
	let resObj = { desc: "注册成功" };
	const registerParams = {
		username: String(req.query.username),
		password: String(req.query.password)
	};
	dbTool
		.userLogin({
			username: String(req.query.username)
		})
		.then((result: Array<string>) => {
			if (result.length > 0) {
				resObj.desc = "用户名已存在";
				res.send(resObj);
			} else {
				dbTool.userSave(registerParams).then((result: object) => {
					res.send(result);
				});
			}
		});
});
app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
