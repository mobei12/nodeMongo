import  mongoose from "mongoose";
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	ctime: Date,
	lastLogin: Date
});
export {userSchema}
