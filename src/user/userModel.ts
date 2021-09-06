const mongoose = require("../dbase");
import {userSchema} from "./userSchema";

let userModel: object = mongoose.model("User", userSchema, "user");
module.exports = userModel;
