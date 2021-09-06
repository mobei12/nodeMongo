/*node自带加密模块*/
import crypto  from 'crypto';

const jwt = require("jsonwebtoken")
const jwtSecret: string = 'mb_own_token';  //token签名
const SECRET_KEY: string = 'MOB_!@#' // 自定的密匙，但需要保存好

// md5 加密
function md5(content: string): string {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex'); // 把输出编程16进制的格式
}

export default class Utils {
    /*md5加密方法*/
    static genPassword = (password: string): string => {
        const str = `password=${password}&key=${SECRET_KEY}` // 拼接方式是自定的，只要包含密匙即可
        return md5(str)
    };
    static setToken = (username: string, user_id: string): Promise<String> => {
        return new Promise(resolve => {
            //expires 设置token过期的时间
            //{ user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
            const token: string = 'Bearer ' + jwt.sign({
                user_name: username,
                user_id: user_id
            }, jwtSecret, {expiresIn: '24h'});
            resolve(token)
        })
    }
    static getToken = (token: string): Promise<object> => {
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
}


