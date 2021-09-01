import crypto = require("crypto");
// 密匙
const SECRET_KEY = 'MOB_!@#' // 密匙是自定的，但需要保存好

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
    }
}


