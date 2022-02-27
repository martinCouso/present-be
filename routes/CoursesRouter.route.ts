import {Router} from "express";
import CoursesController from '../controllers/CoursesController'

const CoursesRouter = Router();

CoursesRouter.get('/:teacherId?',CoursesController.list)
CoursesRouter.post('/',CoursesController.create)

export default CoursesRouter;

