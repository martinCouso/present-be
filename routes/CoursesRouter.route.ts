import {Router} from "express";
import CoursesController from '../controllers/CoursesController'

const CoursesRouter = Router();

CoursesRouter.get('/',CoursesController.list)
CoursesRouter.post('/',CoursesController.create)
CoursesRouter.patch('/:courseId',CoursesController.update)

export default CoursesRouter;

