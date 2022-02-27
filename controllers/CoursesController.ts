/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
import CourseModel from '../Models/Course'
import { Request, Response} from "express";

async function list(request: Request,response: Response) {
    let allCourses = [];
    try{
        if(request.params.teacherId){
            allCourses = await CourseModel.find({teacherId:request.params.teacherId});
        }else{
            allCourses = await CourseModel.find({});
        }
        response.json(allCourses)
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
            console.log('newCourse error',error);
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
