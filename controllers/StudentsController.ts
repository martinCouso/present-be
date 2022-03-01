import {Request, Response} from "express";
import StudentModel, { Student } from '../Models/Students'
import {getUserFromToken} from "../helpers/authHelper";

interface RequestListParams {
    courseId?: string;
}
interface RequestRemoveParams {
    studentId: string;
}

async function list(request : Request<RequestListParams>,response:Response) {
    const {params} = request;
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({error: 'Necesita iniciar sesión'})
    const filter :{teacher:string, courseId?: string} = {
        teacher : userId
    }
    if(params.courseId){
        filter.courseId = params.courseId;
    }
    const allStudents = await StudentModel.find(filter)
    try{
        response.json(allStudents)
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

async function create(request : Request<{ courseId:string },null,Student>,response:Response) {
    try{
        const userId =  await getUserFromToken(request.headers.authorization);
        const courseId = request.params.courseId;
       if(userId){
           const newStudent = new StudentModel(request.body);
           newStudent.teacher = userId;
           newStudent.courses =[courseId]
           newStudent.save();
           response.status(201).json({student:newStudent})
       }

    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
        response.status(500).json({error:'Error al guardar'})
    }
}

async function show(request : Request<{studentId: string}>,response:Response) {
    const {studentId} = request.params;
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({error: 'Necesita iniciar sesión'})
    try{
        const student = StudentModel.findOne({_id:studentId, teacher:userId})
        if (student !== undefined){
            response.json(student)
        } else {
            response.status(404).json({error : "Error, estudiante no encontrado"})
        }
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}

async function remove(request : Request<RequestRemoveParams>,response:Response) {
    const {studentId} = request.params;
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({error: 'Necesita iniciar sesión'})
    try{
        StudentModel.deleteOne({_id:studentId, teacher:userId})
        response.status(204).send();
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
