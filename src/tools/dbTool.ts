const userModel = require("./user/userModel");
import { userModelInstance } from "./interfaceType";
export default class dbTools {
	static userLogin(loginData: userModelInstance): Promise<Array<string>> {
		return userModel
			.find(loginData)
			.then((res: Array<object>) => {
				return res;
			})
			.catch((err: object) => {
				console.error(err);
			});
	}
	/* 用户保存方法 */
	static userSave(saveData: userModelInstance): Promise<object> {
		const saveDate: Date = new Date();
		const saveModel = new userModel(
			Object.assign(saveData, { ctime: saveDate })
		);
		return saveModel
			.save()
			.then((res: object) => {
				return res;
			})
			.catch((err: object) => {
				console.error(err);
			});
	}
}
/*一个可以ts导出方法的模版，暂时没用，留着看看*/
