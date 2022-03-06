import mongoose, { Schema } from "mongoose";

export interface CourseInterface {
  year: number;
  section: string;
  shift: string;
  school: string;
  subject: string;
  schedule: Array<{ day: string; time: string }>;
  teacherId: string;
}

const CourseSchema = new Schema<CourseInterface>({
  year: Number,
  section: String,
  shift: String,
  school: String,
  subject: String,
  schedule: [{ day: String, time: String }],
  teacherId: Schema.Types.ObjectId,
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
