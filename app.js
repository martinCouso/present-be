require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const coursesRouter = require('./routes/CoursesRouter.route');
const studentsRouter = require('./routes/studentsRouter.route');
const teacherRouter = require('./routes/TeacherRouter.route');
const connectToDb = require('./config/db')

const app = express();
connectToDb();

//Parse to Json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/teachers', teacherRouter);

// Start the server on port 3000
app.listen(3000, '127.0.0.1',() => {
    console.log(`app listening at http://localhost:3000`);
});
