const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const listModel = require("./listModel.js");
require("./dbase");
app.use(bodyParser.json()); //解析json类型的请求体
app.get("/student", (req, res) => {
    listModel.find().then(doc => {
        res.send(doc);
    })
});

app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
