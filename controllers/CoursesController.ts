/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import CourseModel, {CourseInterface} from '../Models/Course'
import { Request, Response} from "express";
import {getUserFromToken} from "../helpers/authHelper";

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
            console.log('e.message', e.message);
        }
    }
}
async function create(request: Request,response: Response) {
    try{
        const newCoursePayload : CourseInterface = request.body;
        const userId =  await getUserFromToken(request.headers.authorization);
        if(userId){
            newCoursePayload.teacherId = userId
            const newCourse = new CourseModel(request.body);
            newCourse.save((error)=>{
                if(error){
                    response.status(500);
                    response.json({error:'Error al crear el curso'});
                } else{
                    response.status(201).json({course:newCourse});
                }
            })
        }
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

async function update(request: Request,response: Response) {

    const courseId : string = request.params.courseId;
    const newValues = request.body;
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!newValues){
        response.status(400).json({error:'Faltan los campos a actualizarse'})
    }
    if(!courseId){
        response.status(400).json({error:'El identificador del curso no está presente'})
    }
    const filter = {_id: courseId, teacherId: userId}
    try{
        if(userId){
             const updatedCourse = await CourseModel.findOneAndUpdate(filter, newValues, {new:true})
             response.status(201).json(updatedCourse);
        }else{
            response.status(401).json({error:'Necesitas iniciar sesión primero'})
        }
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

export default {
    create,
    list,
    update
}
