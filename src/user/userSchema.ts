import  mongoose from "mongoose";
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	level: Number,
	ctime: Date,
	lastLogin: Date
});
export {userSchema}
