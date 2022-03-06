import {Router} from "express";
import StudentsController  from '../controllers/StudentsController';



const StudentsRouter= Router();
//Courses

StudentsRouter.get('/:courseId?',StudentsController.list)
StudentsRouter.get('/:userId',StudentsController.show)
StudentsRouter.post('/:courseId',StudentsController.create)
StudentsRouter.delete('/',StudentsController.remove)


export default StudentsRouter;

