const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const listModel = require("./listModel.js");
const { mongoFunction } = require("./insert.ts");
require("./dbase");
app.use(bodyParser.json()); //解析json类型的请求体
app.get("/user/login", (req, res) => {
	listModel.find(req.query).then(doc => {
		let resObj = { desc: "用户不存在!" };
		if (doc.length > 0) {
			resObj.desc = "登陆成功";
		}
		res.send(Object.assign(resObj, doc));
	});
});
app.get("/user/resgister", (req, res) => {
	listModel.find(req.query).then(doc => {
		if (doc.length > 0) {
			mongoFunction.saveFunction;
		}
		res.send(Object.assign(resObj, doc));
	});
});

app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
