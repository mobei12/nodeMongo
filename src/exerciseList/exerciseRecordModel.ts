const mongoose = require("../dbase");
import {exerciseRecord} from './exerciseRecordSchema';

let exerciseRecordModel: object = mongoose.model(
	"ExerciseRecord",
	exerciseRecord,
	"exerciseRecord"
);
module.exports = exerciseRecordModel;
