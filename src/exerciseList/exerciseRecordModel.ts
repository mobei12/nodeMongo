import MongooseProvider from "../db";
import { exerciseRecord } from "./exerciseRecordSchema";
const exerciseRecordModel = MongooseProvider.getInstance().getModel("ExerciseRecord", exerciseRecord);
const findRecordsByUser = async (data: object) => {
	const records = await exerciseRecordModel.find(data);
	return records
}
const findAllRecords = async (filter: object) => {
	const records = await exerciseRecordModel.aggregate([
		{
			$addFields: {
				userId: { $convert: { input: "$user_id", to: "objectId" } },
				key: "$_id",
			},
		},
		{
			$lookup: {
				from: "user",
				localField: "userId",
				foreignField: "_id",
				as: "users",
			},
		},
		{ $match: filter },
	])
	return records
}
const saveRecord = async (data: object) => {
	const record = new exerciseRecordModel(data);
	await record.save();
	return record
}
export { findRecordsByUser,findAllRecords,saveRecord }