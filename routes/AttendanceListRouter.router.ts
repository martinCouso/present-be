import {Router} from "express";
import {checkSchema} from "express-validator";
import AttendanceListController from '../controllers/AttendanceListController'
import {AttendanceListValidationSheme} from "../validation-schemas/AttendanceListValidationSheme"

const AttendanceListRouter = Router();

AttendanceListRouter.post('/', checkSchema(AttendanceListValidationSheme),AttendanceListController.create)
AttendanceListRouter.get('/:courseId',AttendanceListController.list)
//AttendanceListRouter.patch('/:courseId',AttendanceListController.update)

export default AttendanceListRouter;