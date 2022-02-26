import mongoose from "mongoose"
const {Schema} = mongoose

const StudenSchema = new Schema({    
    fistName: String,
    lastName: String,
    age : Number,
    observations: String,
    onlineUser: String,
    email: String,
    courses: [Schema.Types.ObjectId],
    teacher: Schema.Types.ObjectId
})
