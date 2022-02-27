import 'dotenv/config'
import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import CoursesRouter from './routes/CoursesRouter.route'
import StudentsRouter from './routes/StudentsRouter.route'
import  TeacherRouter  from './routes/TeacherRouter.route';
import {connectToDb} from './config/db'

const app = express();
connectToDb();

//Parse to Json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req : Request, res :Response) => {
    res.json({'message': 'ok'});
})

app.use('/api/v1/courses', CoursesRouter);
app.use('/api/v1/students', StudentsRouter);
app.use('/api/v1/teachers', TeacherRouter);

// Start the server on port 3000
app.listen(3000, '127.0.0.1',() => {
    console.log(`app listening at http://localhost:3000`);
});
