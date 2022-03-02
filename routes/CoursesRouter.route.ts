import {Router} from "express";
import CoursesController from '../controllers/CoursesController'
import {checkSchema} from "express-validator";
import {CourseValidationScheme} from "../validation-schemas/CourseValidationScheme";

const CoursesRouter = Router();

CoursesRouter.get('/',CoursesController.list)
CoursesRouter.post('/',checkSchema(CourseValidationScheme),  CoursesController.create)
CoursesRouter.patch('/:courseId',CoursesController.update)

export default CoursesRouter;

