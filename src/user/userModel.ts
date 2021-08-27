const mongoose = require("../dbase");
import userSchema = require("./userSchema");

let userModel: object = mongoose.model("User", userSchema, "user");
module.exports = userModel;
