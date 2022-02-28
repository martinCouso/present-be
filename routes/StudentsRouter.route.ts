import {Router} from "express";
import StudentsController  from '../controllers/StudentsController';



const StudentsRouter= Router();
//Courses

StudentsRouter.get('/',StudentsController.list)
StudentsRouter.get('/:userId',StudentsController.show)
StudentsRouter.post('/',StudentsController.create)
StudentsRouter.delete('/',StudentsController.remove)


export default StudentsRouter;

