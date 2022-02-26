import mongoose from "mongoose"
const {Schema} = mongoose

const StudentSchema = new Schema({
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

module.exports = Student;
