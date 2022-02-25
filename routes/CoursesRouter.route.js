const express = require('express');
const CoursesRouterRoute = express.Router();
const CoursesController = require('../controllers/CoursesController');
//Courses
CoursesRouterRoute.get('/',CoursesController.list)
//CoursesRouter.post('/',CoursesController.create)


module.exports = CoursesRouterRoute;

