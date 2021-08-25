let mongoose = require("mongoose");

// 导入连接模块
let connection = require("./dbase.js");

interface saveObject {
	schema: string; //表名称
	keyObj: Object; //键值对
	data: Object; //数据对象
}
/* export default class MongoFunction {
	public saveFunction(saveObject: saveObject) {
		// 创建schema
		console.log(saveObject.schema);
		const Schema = new mongoose.Schema(saveObject.keyObj);
		const Model = connection.model(saveObject.schema, Schema);
		// 通过实例化model创建文档
		let documents = new Model(saveObject.data);
		// 将文档插入到数据库，save方法返回一个Promise对象。
		documents.save().then((doc: any) => {
			return doc;
		});
	}
} */
export const saveFunction = (saveObject: saveObject) => {
	// 创建schema
	const Schema = new mongoose.Schema(saveObject.keyObj);
	const Model = connection.model(saveObject.schema, Schema);
	// 通过实例化model创建文档
	let documents = new Model(saveObject.data);
	// 将文档插入到数据库，save方法返回一个Promise对象。
	documents.save().then((doc: any) => {
		return doc;
	});
};
