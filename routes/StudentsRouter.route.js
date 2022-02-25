const express = require('express');
const StudentsRouter= express.Router();
const StudentsController = require('../controllers/StudentsController');
//Courses

StudentsRouter.get('/',StudentsController.list)
StudentsRouter.get('/:userId',StudentsController.show)
StudentsRouter.post('/',StudentsController.create)
StudentsRouter.delete('/',StudentsController.remove)


module.exports = StudentsRouter;

