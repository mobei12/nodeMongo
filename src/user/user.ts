"use strict";
import ex = require("express");
const userModel = require("./userModel");
let router = ex.Router();
router.use((req, res, next) => {
    console.log("请求的时间", Date.now());
    next();
});
router.get("/login", (req, res) => {
    userModel
        .find(req.query)
        .then((result: Array<object>) => {
            res.send(result);
        })
        .catch((err: object) => {
            console.error(err);
        });
});
router.get("/register", (req, res) => {
    let resObj = {desc: "注册成功"};
    userModel
        .find({username:req.query.username})
        .then((result: Array<object>) => {
            if (result.length > 0) {
                resObj.desc = "用户名已存在";
                res.send(resObj);
            } else {
                const saveDate: Date = new Date();
                const saveModel = new userModel(
                    Object.assign(req.query, {ctime: saveDate})
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
module.exports = router;
