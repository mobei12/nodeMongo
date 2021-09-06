import mongoose from 'mongoose';

const exerciseRecord = new mongoose.Schema({
	user_id: String, //用户id
	duration: Number, //运动用时,秒
	number_of_times: Number, //运动分的次数
	number_of_breaks: Number, //休息的次数
	single_time: Number, //单次休息的时间s秒
    exercise_type: String, //运动类型，目前只有jumpRope(跳绳)
	ctime: Date
});
export {exerciseRecord}
