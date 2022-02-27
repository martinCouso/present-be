import 'dotenv/config'
import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import {auth} from 'express-oauth2-jwt-bearer';
import CoursesRouter from './routes/CoursesRouter.route'
import StudentsRouter from './routes/StudentsRouter.route'
import  TeacherRouter  from './routes/TeacherRouter.route';
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

// Start the server on port 3000
app.listen(3000, '127.0.0.1',() => {
    console.log(`app listening at http://localhost:3000`);
});


/*
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkhRQVRqTjJOemFGQmhWbDNJSWgycCJ9.eyJpc3MiOiJodHRwczovL2Rldi01cHB6bnh6by51cy5hdXRoMC5jb20vIiwic3ViIjoiY0FWN2RuaVR2MlVXa0M1dFpzODI0MzZmNWhsbXFXQ3ZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdG9tb2xpc3RhLmNvbS9hcGkiLCJpYXQiOjE2NDU5OTA4MDcsImV4cCI6MTY0NjA3NzIwNywiYXpwIjoiY0FWN2RuaVR2MlVXa0M1dFpzODI0MzZmNWhsbXFXQ3YiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.bNgHdehsmC2EVyTj6fWmFnUQA5J1VwhfYMUICodKg-6FF8NgmVt8sUD3Axrje-11jK5e0-ntG25Jrq8npIDO1j2HTkb8bGfBUKj6MVlSHRXtNQcK1cW-HdBqp2ac75kl6oEdClI1OIH47_rCajma6pOl4ljgfUaoo14Jh2OKCj0ZgH-FiCvbv3u0SMRtCvoLrwF6nrO8ypTZRZQ1E9W1SsHOQi27L7DS_tO8hYZP56KI3Nq_zkvc3zYvdQ9SZC-eM37G_Y6cedQDOtTmC0sFPCHdTDDmqLJYPAbsH2UB4MPnqTUygkhyv5geOzr96mJTgrGqj-BbGWoj6vDXyRYOWA
 */
