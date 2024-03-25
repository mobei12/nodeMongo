/*node自带加密模块*/
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken")
const jwtSecret: string = 'mb_own_token';  //token签名
const SECRET_KEY: string = 'MOB_!@#' // 自定的密匙，但需要保存好

// md5 加密
/**
 * @param {string} content 要加密的字符串
 * */
function md5(content: string): string {
	let md5 = crypto.createHash('md5');
	return md5.update(content).digest('hex'); // 把输出编程16进制的格式
}

/**密码加密
 * @param {string} password 加密的密码
 * */
const genPassword = (password: string): string => {
	return md5(`password=${password}&key=${SECRET_KEY}`)
}
/**生成token
 * @param {string} user_name 用户名
 * @param {string} user_id 密码
 * */
const setToken = (user_name: string, user_id: string): Promise<String> => {
	return new Promise(resolve => {
		//expires 设置token过期的时间
		//{ user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
		const token: string = 'Bearer ' + jwt.sign({
			user_name,
			user_id
		}, jwtSecret, { expiresIn: '24h' });
		resolve(token)
	})
}
/**解析token
 * @param {string} token 需要解密的token
 * */
const getToken = (token: string): Promise<object> => {
	return new Promise((resolve, reject) => {
		if (!token) {
			console.log('token是空的')
			reject({
				error: 'token 是空的'
			})
		} else {
			//第二种  改版后的
			const info = jwt.verify(token.split(' ')[1], jwtSecret);
			resolve(info);  //解析返回的值（sign 传入的值）
		}
	})
}
const checkPermission = (req: Request, res: Response, next: NextFunction) => {
	const { level } = req.user;
	if (!level || level < 2) {
	  return res.status(401).send({
		code: 401,
		message: "权限不足",
	  });
	}
	next();
  };
export {
	genPassword, setToken, getToken,checkPermission
}


