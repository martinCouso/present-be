const mongoose = require('mongoose')
const {Schema} = mongoose;

const TeacherSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password : String,
    courses: [Schema.Types.ObjectId],
})

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
