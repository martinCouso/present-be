const express = require('express');
const CoursesRouter = express.Router();
const CoursesController = require('../controllers/CoursesController');
//Courses
CoursesRouter.get('/:teacherId?',CoursesController.list)
CoursesRouter.post('/',CoursesController.create)


module.exports = CoursesRouter;

