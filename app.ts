import 'dotenv/config'
import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import {auth} from 'express-oauth2-jwt-bearer';
import CoursesRouter from './routes/CoursesRouter.route'
import StudentsRouter from './routes/StudentsRouter.route'
import TeacherRouter  from './routes/TeacherRouter.route';
import AttendanceListRouter  from './routes/AttendanceListRouter.router';

import {connectToDb} from './config/db'

const app = express();
connectToDb();

//Parse to Json
app.use(bodyParser.json());

const checkAuth0Jwt = auth({audience: 'https://tomolista.com/api', issuerBaseURL:'https://dev-5ppznxzo.us.auth0.com/'});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req : Request, res :Response) => {
    res.json({'message': 'ok'});
})

app.use('/api/v1/courses', checkAuth0Jwt, CoursesRouter);
app.use('/api/v1/students', checkAuth0Jwt,  StudentsRouter);
app.use('/api/v1/teachers', checkAuth0Jwt, TeacherRouter);
app.use('/api/v1/attendance-lists', checkAuth0Jwt, AttendanceListRouter);

// Start the server on port 3000
app.listen(3000, '127.0.0.1',() => {
    console.log(`app listening at http://localhost:3000`);
});

