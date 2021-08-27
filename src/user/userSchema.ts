import mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	ctime: Date,
	lastLogin: Date
});
module.exports = userSchema;
