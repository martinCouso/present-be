import {Router} from "express";
import AttendanceListController from '../controllers/AttendanceListController'

const AttendanceListRouter = Router();

AttendanceListRouter.post('/', AttendanceListController.create)
AttendanceListRouter.get('/:courseId',AttendanceListController.list)

export default AttendanceListRouter;