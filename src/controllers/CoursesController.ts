/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import CourseModel, { CourseInterface } from "../../Models/Course";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

async function list(request: Request, response: Response) {
  let allCourses = [];
  try {
    const userId = response.locals.userId;
    allCourses = await CourseModel.find({ teacherId: userId });
    response.json(allCourses);
  } catch (e) {
    if (e instanceof Error) {
      console.error("[ERROR]GET: api/vi/courses", e.message);
      response.status(500).json({ errors: [{ msg: e.message }] });
    }
    response.status(500).send();
  }
}

async function create(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json(errors);
  }
  try {
    const newCoursePayload: CourseInterface = request.body;
    const { userId } = response.locals;
    newCoursePayload.teacherId = userId;
    const newCourse = new CourseModel(request.body);
    newCourse.save((error) => {
      if (error) {
        response.status(500);
        response.json({ errors: [{ msg: "Error al crear el curso" }] });
      } else {
        response.status(201).json({ course: newCourse });
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error("[ERROR]POST: api/vi/courses", e.message);
      response.status(500).json({ errors: [{ msg: e.message }] });
    }
    response.status(500).send();
  }
}

async function update(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json(errors);
  }
  const { userId } = response.locals;
  const { courseId } = request.params;
  const newValues = request.body;
  const filter = { _id: courseId, teacherId: userId };
  try {
    const updatedCourse = await CourseModel.findOneAndUpdate(
      filter,
      newValues,
      { new: true }
    );
    response.status(201).json(updatedCourse);
  } catch (e) {
    if (e instanceof Error) {
      console.error("[ERROR]PATCH: api/v1/courses", e.message);
      response.status(500).json({ errors: [{ msg: e.message }] });
    }
    response.status(500).send();
  }
}

export default {
  create,
  list,
  update,
};
