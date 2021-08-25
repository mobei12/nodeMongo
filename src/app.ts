"use strict";
import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
const listModel = require("../listModel.js");
import { saveFunction } from "../insert";
require("../dbase.js");
app.use(bodyParser.json()); //解析json类型的请求体
app.get("/user/login", (req, res) => {
	listModel.find(req.query).then((doc: Array<any>) => {
		let resObj = { desc: "用户不存在!" };
		if (doc.length > 0) {
			resObj.desc = "登陆成功";
		}
		res.send(doc);
	});
});
app.get("/user/resgister", (req, res) => {
	let resObj = { desc: "注册成功" };
	listModel.find(req.query).then((doc: Array<string>) => {
		if (doc.length <= 0) {
			const addObject = {
				schema: "students",
				keyObj: {
					username: String,
					password: String
				},
				data: req.query
			};
			saveFunction(addObject);
		} else {
			resObj.desc = "用户名已存在";
		}
		res.send(Object.assign(resObj, doc));
	});
});
app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
