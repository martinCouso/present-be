import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    firstName: string,
    lastName: string,
    email: string,
    password : string,
    courses?: string[],
}

const UserSchema = new Schema<UserInterface>({
    firstName: String,
    lastName: String,
    email: String,
    password : String,
    courses: [Schema.Types.ObjectId],
})

const User = mongoose.model('User', UserSchema);

export default User;
