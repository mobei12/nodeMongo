import  mongoose from "mongoose";
interface IUser{
	username: string
	password: string
	level: number
	ctime: Date
	lastLogin: Date
}
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	level: Number,
	ctime: Date,
	lastLogin: Date
});
export {userSchema,IUser}
