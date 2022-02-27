import mongoose from "mongoose"
const {Schema} = mongoose

export interface Student {
    fistName: string,
    lastName: string,
    age : number,
    observations: string,
    onlineUser: string,
    email: string,
    courses: string[],
    teacher:string
}

const StudentSchema = new Schema<Student>({
    fistName: String,
    lastName: String,
    age : Number,
    observations: String,
    onlineUser: String,
    email: String,
    courses: [Schema.Types.ObjectId],
    teacher: Schema.Types.ObjectId
})

const Student = mongoose.model('Student', StudentSchema);

export default Student;
