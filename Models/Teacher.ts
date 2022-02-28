import mongoose, { Schema } from "mongoose";

export interface TeacherInterface {
    firstName: string,
    lastName: string,
    email: string,
    password : string,
    courses: string[],
}

const TeacherSchema = new Schema<TeacherInterface>({
    firstName: String,
    lastName: String,
    email: String,
    password : String,
    courses: [Schema.Types.ObjectId],
})

const Teacher = mongoose.model('Teacher', TeacherSchema);

export default Teacher;
