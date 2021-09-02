"use strict";
import ex = require("express");

const exerciseRecordModel = require("./exerciseRecordModel");

let router = ex.Router();

router.use((req, res, next) => {
    console.log("请求的时间", Date.now());
    next();
});
/*根据用户id，查询运动信息*/
router.get("/find", (Request:any, res) => {
    const user: { user_id?: string; user_name?: string }= Request.user
    exerciseRecordModel
        .find({user_id:user.user_id})
        .then((result: Array<object>) => {
            res.send(result);
        })
        .catch((err: object) => {
            console.error(err);
        });
});
/*存储运动记录*/
router.get("/saveRecord", (req, res) => {
    const saveDate: Date = new Date();
    const saveModel = new exerciseRecordModel(
        Object.assign(req.query, {ctime: saveDate})
    );
    saveModel.save().then((result: object) => {
        res.send(result);
    });
});


module.exports = router;
