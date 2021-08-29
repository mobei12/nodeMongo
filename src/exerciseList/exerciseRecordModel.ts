const mongoose = require("../dbase");
import exerciseRecord = require("./exerciseRecordSchema");

let exerciseRecordModel: object = mongoose.model(
	"ExerciseRecord",
	exerciseRecord,
	"exerciseRecord"
);
module.exports = exerciseRecordModel;
