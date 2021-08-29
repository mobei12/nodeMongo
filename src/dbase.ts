import mongoose = require("mongoose");

const db_url = "mongodb://127.0.0.1:27017/?authSource=admin";
mongoose
	.connect(db_url, {
		user: "root",
		pass: "123456"
	})
	.then(rec => console.log("数据库连接成功"))
	.catch(() => console.log("数据库连接失败"));

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", () => {
	console.log("Mongoose connection disconnected");
});

module.exports = mongoose;