const mongoose = require('mongoose')
const {Schema} = mongoose;

const CourseSchema = new Schema({
    year: Number,
    section: String,
    shift : String,
    school: String,
    subject: String,
    schedule:[{day: String, time: String}],
    teacherId: Schema.Types.ObjectId,
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
