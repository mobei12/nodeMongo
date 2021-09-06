import mongoose from 'mongoose';

const db_url = "mongodb://106.53.115.30:27017/?authSource=admin";
mongoose
	.connect(db_url, {
		user: "root",
		pass: "123456",
		useUnifiedTopology:true
	})
	.then(() => console.log("数据库连接成功"))
	.catch((err:object) => console.log("数据库连接失败",err));

/**
 * 连接断开
 */
mongoose.connection.on("disconnected", () => {
	console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
