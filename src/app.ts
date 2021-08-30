"use strict";
import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
const user = require('./user/user')
app.use(bodyParser.json()); //解析json类型的请求体

app.get("/", (req, res) => {
	console.log(req.query);
});
//挂载用户操作相关方法
app.use('/user',user)
app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
