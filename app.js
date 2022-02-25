
const express = require('express');
const bodyParser = require('body-parser');
const coursesRouter = require('./routes/CoursesRouter.route');
const studentsRouter = require('./routes/studentsRouter.route');
const app = express();

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

app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);

// Start the server on port 3000
app.listen(3000, '127.0.0.1',() => {
    console.log(`app listening at http://localhost:3000`);
});
