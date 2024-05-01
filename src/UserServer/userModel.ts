import {MongooseInstance} from "../db";
import { userSchema,IUser } from "./userSchema";
const UserModel = MongooseInstance.getModel("User", userSchema);
const createUser = async (data: Omit<IUser, "lastLogin">) => {
    const user = new UserModel(data);
    await user.save();
    return user
}
const userFind = async (data:  Pick<IUser, "username">) => {
    const user = await UserModel.findOne(data);
    return user
}
const userFindAll = async (data: object) => {
    const user = await UserModel.find(data);
    return user
}

export { createUser, userFind ,userFindAll }