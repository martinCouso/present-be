/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */


const TeacherModel = require('../Models/Teacher');


async function create(request,response,next) {
    try{
        const newTeacher = new TeacherModel(request.body);
        newTeacher.save((error)=>{
            console.log('newTeacher error',error);
            if(error){
                response.status(500);
                response.json({error:'Error al salvar el docente'})
            } else{
                response.json({course:newTeacher})
            }
        })
    }catch (e){
        response.status(500);
        response.json({error:'Error al salvar el docente'})
        console.log('e.message',e.message);
    }
}
module.exports = {
    create
}
