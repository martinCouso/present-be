import {Request, Response} from "express";
import StudentModel, { Student } from '../Models/Students'

interface RequestListParams {
    courseId: string;
}
interface RequestRemoveParams {
    studentId: string;
}

async function list(request : Request<RequestListParams>,response:Response) {
    const allStudents = StudentModel.find({courses: request.params.courseId})
    try{
        response.json(allStudents)
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}
async function create(request : Request<null,null,Student>,response:Response) {
    try{
        //TODO: validation
        const newStudent = new StudentModel(request.body);
        newStudent.save();
        response.json({student:newStudent})
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}
async function show(request : Request<{studentId: string}>,response:Response) {
    const {params} = request;
    try{
        const student = StudentModel.findById(params.studentId)
        if (student !== undefined){
            response.json(student)
        } else {
            response.status(404)
            response.json({error : "estudiante no encontrado"})
            console.log("continuo despues del response")
        }

    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

async function remove(request : Request<RequestRemoveParams>,response:Response) {
    try{
        StudentModel.deleteOne({_id:request.params.studentId})
        response.json({message:'create called'})
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

export default {
    list,
    create,
    remove,
    show
}
