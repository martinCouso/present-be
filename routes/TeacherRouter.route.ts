import {Router} from "express";
import TeacherController from '../controllers/TeacherController';
const TeacherRouter = Router();

//Courses
TeacherRouter.post('/sing-up',TeacherController.create)
TeacherRouter.post('/sing-ip',TeacherController.singIn)

export default TeacherRouter;

