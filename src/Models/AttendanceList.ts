import mongoose, { Schema } from "mongoose";
import { StudentSchema, StudentInterface } from "./Student";

interface AttendanceEntryInterface {
  fullName: string;
  studentId: string;
  status: string;
}

// this interface was created whit typescript
export interface AttendanceInterface {
  date: Date;
  entries: [AttendanceEntryInterface];
  teacherId: string;
  courseId: string;
}

const AttendanceEntrySchema = new Schema<AttendanceEntryInterface>({
  fullName: String,
  studentId: String,
  status: String,
});

const AttendanceListSchema = new Schema<AttendanceInterface>({
  date: Date,
  entries: [AttendanceEntrySchema],
  teacherId: mongoose.Types.ObjectId,
  courseId: mongoose.Types.ObjectId,
});
// this two models are being created using the schemas defined above
export const AttendanceEntryModel = mongoose.model(
  "AttendanceEntry",
  AttendanceEntrySchema
);
export const AttendanceListModel = mongoose.model(
  "AttendanceList",
  AttendanceListSchema
);
