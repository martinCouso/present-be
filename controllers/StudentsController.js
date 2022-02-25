/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
 const students = [
     {
    _id: 1,
    fistName: 'fistName1',
    lastName: 'lastName1',
    age : 15,
    observations: 'Normal 55',
    onlineUser: 'classroom.com/userTest23',
    email:'test@test.com'
    },
    {
    _id: 2,
    fistName: 'fistName1',
    lastName: 'lastName1',
    age : 15,
    observations: 'Normal 55',
    onlineUser: 'classroom.com/userTest23',
    email:'test@test.com'
        },
    {
    _id: 3,
    fistName: 'fistName1',
    lastName: 'lastName1',
    age : 15,
    observations: 'Normal 55',
    onlineUser: 'classroom.com/userTest23',
    email:'test@test.com'
    }
]

async function list(request,response,next) {
    try{
        response.json(students)
    }catch (e){
        console.log('e.message',e.message);
    }
}
async function create(request,response,next) {
    try{
        request.json({message:'create called'})
    }catch (e){
        console.log('e.message',e.message);
    }
}
async function show(request,response,next) {
    console.log("llego a show")
    console.log(request.params)
    try{
        const student = students.find((currentStudent) => currentStudent._id === parseInt(request.params.userId))
        if (student !== undefined){
            response.json(student)
        } else {
            response.status(400)
            response.json({error : "estudiante no encontrado"})
            console.log("continuo despues del response")
        }
        
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
    create,
    remove,
    show
}
