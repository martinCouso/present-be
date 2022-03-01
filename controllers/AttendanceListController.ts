import { AttendanceListModel, AttendanceEntryModel } from "../Models/AttendanceList";
import { Request, Response} from "express";
import {getUserFromToken} from "../helpers/authHelper";

async function create(request: Request,response: Response) {
    try {
        const {params} = request;
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({error: 'Necesita iniciar sesión'})

    const newAttendanceList = new AttendanceListModel(request.body)

    newAttendanceList.teacherId = userId;

    newAttendanceList.save((error)=>{
        if(error){
            response.status(500);
            response.json({error:'Error al crear la lista de presentes'});
        } else{
            response.status(201).json({attendanceList:newAttendanceList});
        }
    })
    }catch (e){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}


async function list(request: Request,response: Response) {
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({error: 'Necesita iniciar sesión'})
    let allAttendanceLists = [];
    try{
        const userId =  await getUserFromToken(request.headers.authorization);
        const course = request.params.courseId;
        if(userId){
            allAttendanceLists = await AttendanceListModel.find({teacherId:userId, courseId: course});
            response.json(allAttendanceLists)
        }else{
            response.status(401).json({error:'Necesitas iniciar sesión primero'})
        }

    }catch (e ){
        if( e instanceof Error){
            console.log('e.message', e.message);
        }
    }
}


export default {
    create, 
    list   
}





