/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import CourseModel from '../Models/Course'
import { Request, Response} from "express";
import {getUserFromToken} from "../helpers/authHelper";

async function list(request: Request,response: Response) {
    let allCourses = [];
    const authToken = request.headers.authorization?.split(' ')[1];
    const userId =  await getUserFromToken(authToken);
    try{
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
        const newCourse = new CourseModel(request.body);
        newCourse.save((error)=>{
            if(error){
                response.status(500);
                response.json({error:'Error al salvar el curso'})
            } else{
                response.json({course:newCourse})
            }
        })
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

export default {
    create,
    list,
}
