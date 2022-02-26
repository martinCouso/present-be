const express = require('express');
const TeacherRouter = express.Router();
const TeacherController = require('../controllers/TeacherController');
//Courses
TeacherRouter.post('/',TeacherController.create)


module.exports = TeacherRouter;

