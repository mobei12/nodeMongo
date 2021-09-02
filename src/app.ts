"use strict";
import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
const expressJwt=require('express-jwt')
import utils from "./tools/utils";
app.use(bodyParser.json()); //解析json类型的请求体
/*引入数据库操作的模块start*/
const user = require('./user/user')
const exerciseRecord = require('./exerciseList/exerciseRecord')
/*数据库操作的模块end*/
app.use(expressJwt({
    secret:'mb_own_token',
    algorithms:['HS256']
}).unless({
    path:['/user/login','/user/register']  //不需要验证的接口名称
}))
app.use((req,res,next)=>{
    const token =  req.headers['authorization'];
    if(token == undefined){
         next();
    }else{
        utils.getToken(token).then((data)=> {
             next();
        }).catch(()=>{
            console.log(123)
             next();
        })
    }
})

//挂载用户操作相关模块
app.use('/user',user)
//挂载运动相关模块
app.use('/exerciseRecord',exerciseRecord)
//token失效返回信息
app.use(function(err:any,req:any,res:any,next:any){
    if(err.status==401){
        return res.status(401).send('string')
        //可以设置返回json 形式  res.json({message:'token失效'})
    }
})
app.listen(process.env.PORT || 8000, function () {
	console.log("Listen port:8000...");
});
