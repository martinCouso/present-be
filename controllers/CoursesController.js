/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */


const CourseModel = require('../Models/Course');

async function list(request,response,next) {
    let allCourses = [];
    if(request.params.teacherId){
        allCourses = await CourseModel.find({teacherId:request.params.teacherId});
    }else{
        allCourses = await CourseModel.find({});
    }
    try{
        response.json(allCourses)
    }catch (e){
        console.log('e.message',e.message);
    }
}
async function create(request,response,next) {
    console.log('request.body',request.body);
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
        console.log('e.message',e.message);
    }
}
async function update(request,response,next) {
    try{
        request.json({message:'create called'})
    }catch (e){
        console.log('e.message',e.message);
    }
}
async function remove(request,response,next) {
    try{
        request.json({message:'create called'})
    }catch (e){
        console.log('e.message',e.message);
    }
}

module.exports = {
    list,
    create
}
