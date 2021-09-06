"use strict";
import * as express from 'express';
let router = express.Router();
const userModel = require("./userModel");
import utils from "../tools/utils";

interface userModelInstance {
    username: string;
    _id: string;
    password?: string;
}

router.use((req, res, next) => {
    console.log("请求的时间", Date.now());
    next();
});
router.post("/login", (req, res) => {
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
            }else {
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
router.get("/register", (req, res) => {
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
module.exports = router;
