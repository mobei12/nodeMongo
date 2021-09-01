"use strict";
import ex = require("express");
const userModel = require("./userModel");
import utils from "../utils";
let router = ex.Router();
router.use((req, res, next) => {
    console.log("请求的时间", Date.now());
    next();
});
router.get("/login", (req, res) => {
    let loginData = req.query
    loginData.password  = utils.genPassword(String(loginData.password))
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
                let registerData = req.query
                registerData.password  = utils.genPassword(String(registerData.password))
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
module.exports = router;
