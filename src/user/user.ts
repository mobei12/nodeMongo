"use strict";
import ex = require("express");

const userModel = require("./userModel");

let router = ex.Router();

router.use((req, res, next) => {
    console.log("请求的时间", Date.now());
    next();
});
router.get("/login", (req, res) => {
    const loginParams = {
        username: String(req.query.username),
        password: String(req.query.password)
    };
    userModel
        .find(loginParams)
        .then((result: Array<object>) => {
            res.send(result);
        })
        .catch((err: object) => {
            console.error(err);
        });
});
router.get("/register", (req, res) => {
    let resObj = {desc: "注册成功"};
    const registerParams = {
        username: String(req.query.username),
        password: String(req.query.password)
    };
    userModel
        .find(registerParams)
        .then((result: Array<object>) => {
            if (result.length > 0) {
                resObj.desc = "用户名已存在";
                res.send(resObj);
            } else {
                const saveDate: Date = new Date();
                const saveModel = new userModel(
                    Object.assign(registerParams, {ctime: saveDate})
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
