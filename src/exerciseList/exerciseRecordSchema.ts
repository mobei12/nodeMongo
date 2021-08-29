import mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	user_id: String, //用户id
	duration: Number, //运动用时,秒
	number_of_times: Number, //运动分的次数
	number_of_breaks: Number, //休息的次数
	single_time: Number, //单次休息的时间s秒
	ctime: Date
});
module.exports = userSchema;
