/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import CourseModel, {CourseInterface} from '../Models/Course'
import { Request, Response} from "express";
import {getUserFromToken} from "../helpers/authHelper";
import {validationResult} from "express-validator";

async function list(request: Request,response: Response) {
    let allCourses = [];
    try{
        const userId =  await getUserFromToken(request.headers.authorization);
        if(userId){
            allCourses = await CourseModel.find({teacherId:userId});
            response.json(allCourses)
        }else{
            response.status(401).json({error:'Necesitas iniciar sesión primero'})
        }
    }catch (e ){
        if( e instanceof Error){
            console.error('[ERROR]GET: api/vi/courses', e.message);
            response.status(500).json({errors:[{msg:e.message}]})
        }
        response.status(500).send()
    }
}

async function create(request: Request,response: Response) {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json(errors);
    }
    try{
        const newCoursePayload : CourseInterface = request.body;
        const userId =  await getUserFromToken(request.headers.authorization);
        if(userId){
            newCoursePayload.teacherId = userId
            const newCourse = new CourseModel(request.body);
            newCourse.save((error)=>{
                if(error){
                    response.status(500);
                    response.json({errors:[{msg: 'Error al crear el curso'}]});
                } else{
                    response.status(201).json({course:newCourse});
                }
            })
        }
    }catch (e){
        if( e instanceof Error){
            console.error('[ERROR]POST: api/vi/courses', e.message);
            response.status(500).json({errors:[{msg:e.message}]})
        }
        response.status(500).send()
    }
}

async function update(request: Request,response: Response) {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json(errors);
    }
    const courseId : string = request.params.courseId;
    const newValues = request.body;
    const userId =  await getUserFromToken(request.headers.authorization);
    const filter = {_id: courseId, teacherId: userId}
    try{
        if(userId){
             const updatedCourse = await CourseModel.findOneAndUpdate(filter, newValues, {new:true})
            console.log('updatedCourse',updatedCourse);
             response.status(201).json(updatedCourse);
        }else{
            response.status(401).json({errors:[{msg:'Necesitas iniciar sesión primero'}]})
        }
    }catch (e){
        if( e instanceof Error){
            console.error('[ERROR]PATCH: api/v1/courses', e.message);
            response.status(500).json({errors:[{msg:e.message}]})
        }
        response.status(500).send()
    }
}

export default {
    create,
    list,
    update
}
