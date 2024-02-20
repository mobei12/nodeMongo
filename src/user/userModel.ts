import MongooseProvider from "../db";
import { userSchema } from "./userSchema";
const UserModel = MongooseProvider.getInstance().getModel("User", userSchema);
const createUser = async (data: object) => {
    const user = new UserModel(data);
    await user.save();
    return user
}
const userFind = async (data: object) => {
    const user = await UserModel.findOne(data);
    return user
}
const userFindAll = async (data: object) => {
    const user = await UserModel.find(data);
    return user
}
const closeConnection = () => {
    MongooseProvider.getInstance().disconnect()
}
export { createUser, userFind, closeConnection,userFindAll }