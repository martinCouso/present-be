import { CourseInterface } from "../../Models/Course";

export const coursesList: CourseInterface[] = [
  {
    year: 1,
    section: "A",
    shift: "mañana",
    school: "Escuela 1",
    subject: "Lengua",
    schedule: [
      { day: "lunes", time: "9-11" },
      { day: "martes", time: "9-12" },
    ],
    teacherId: "",
  },
  {
    year: 2,
    section: "B",
    shift: "tarde",
    school: "Escuela 2",
    subject: "Historia",
    schedule: [
      { day: "miercoles", time: "12-14" },
      { day: "viernes", time: "16-17" },
    ],
    teacherId: "",
  },
];
