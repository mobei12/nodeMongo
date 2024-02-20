import mongoose from "mongoose";

const db_url = "mongodb://root:123456@127.0.0.1:27017/";
mongoose
	.connect(db_url)
	.then(() => console.log("数据库连接成功"))
	.catch((err: object) => console.log("数据库连接失败", err));

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", () => {
	console.log("Mongoose 连接断开");
});

module.exports = mongoose;
