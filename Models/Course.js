import mongoose from "mongoose"
const {Schema} = mongoose

const CourseSchema = new Schema({    
    year: Number,
    section: String,
    shift : String,
    school: String,
    subject: String,
    schedule:[
        {day: String, time: String},
        {day: String, time: String},
        {day: String, time: String},
    ]
})
