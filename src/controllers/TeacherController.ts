/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import TeacherModel from "../../Models/Teacher";
import { Request, Response } from "express";

async function create(request: Request, response: Response) {
  try {
    const newTeacher = new TeacherModel(request.body);
    newTeacher.save((error) => {
      console.log("newTeacher error", error);
      if (error) {
        response.status(500);
        response.json({ error: "Error al salvar el docente" });
      } else {
        response.json({ course: newTeacher });
      }
    });
  } catch (e) {
    response.status(500);
    response.json({ error: "Error al salvar el docente" });
    if (e instanceof Error) {
      console.log("e.message", e.message);
    }
  }
}

async function singIn(request: Request, response: Response) {
  try {
    const { body } = request;
    const { username, password } = body;
    const newTeacher = new TeacherModel(request.body);
    newTeacher.save((error) => {
      if (error) {
        response.status(500);
        response.json({ error: "Error al salvar el docente" });
      } else {
        response.json({ course: newTeacher });
      }
    });
  } catch (e) {
    response.status(500);
    response.json({ error: "Error al salvar el docente" });
    if (e instanceof Error) {
      console.log("e.message", e.message);
    }
  }
}

export default {
  create,
  singIn,
};
