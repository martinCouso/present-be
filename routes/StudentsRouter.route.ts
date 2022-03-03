import {Router} from "express";
import StudentsController  from '../controllers/StudentsController';
import {checkSchema} from "express-validator";
import {StudentsValidationScheme} from "../validation-schemas/StudentsValidationScheme";



const StudentsRouter= Router();
//Courses

StudentsRouter.get('/:courseId?',StudentsController.list)
StudentsRouter.get('/:userId',StudentsController.show)
StudentsRouter.post('/',checkSchema(StudentsValidationScheme), StudentsController.create)


StudentsRouter.delete('/',StudentsController.remove)


export default StudentsRouter;

