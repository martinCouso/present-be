import { AttendanceListModel, AttendanceEntryModel } from "../Models/AttendanceList";
import { Request, Response} from "express";
import {getUserFromToken} from "../helpers/authHelper";
import {validationResult} from "express-validator"

async function create(request: Request,response: Response) {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json(errors);
    }
    try {
        const {params} = request;
        const userId =  await getUserFromToken(request.headers.authorization);
        if(!userId) return response.status(401).json({errors: [{msg:'Necesitas iniciar sesión primero'}]})

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
    }catch (e ){
        if( e instanceof Error){
            console.error('[ERROR]POST: api/v1/attendace-list', e.message);
            response.status(500).json({errors:[{msg:e.message}]})
        }
        response.status(500).send()
    }
}


async function list(request: Request,response: Response) {
    const userId =  await getUserFromToken(request.headers.authorization);
    if(!userId) return response.status(401).json({errors: [{msg:'Necesitas iniciar sesión primero'}]})
    let allAttendanceLists = [];
    try{
        const course = request.params.courseId;
        allAttendanceLists = await AttendanceListModel.find({teacherId:userId, courseId: course});
        response.json(allAttendanceLists)
    }catch (e ){
        if( e instanceof Error){
            console.error('[ERROR]GET: api/v1/attendace-list', e.message);
            response.status(500).json({errors:[{msg:e.message}]})
        }
        response.status(500).send()
    }
}


export default {
    create, 
    list   
}





