/**
 * Courses Controller
 * Author: Martin Couso, martin.couso@gmail.com
 */
const courses = [
    {_id:1,
        year: '1',
        section: 'a',
        shift : 'tarde',
        school: 'Normal 55',
        subject: 'Biologia',
        schedule:[
            {day: 'Lunes', time: '9-10'},
            {day: 'Martes', time: '9-10'},
            {day: 'Viernes', time: '9-10'},
        ]
    },
    {_id:2,
        year: '2',
        section: 'a',
        shift : 'tarde',
        school: 'Normal 55',
        subject: 'Biologia',
        schedule:[
            {day: 'Lunes', time: '9-10'},
            {day: 'Martes', time: '9-10'},
            {day: 'Viernes', time: '9-10'},
        ]
    },{_id:3,
        year: '3',
        section: 'b',
        shift : 'ma;ana',
        school: 'Normal 1',
        subject: 'Matematica',
        schedule:[
            {day: 'Miercoles', time: '13-15'},
            {day: 'Jueves', time: '8-10'},
        ]
    }
]

async function list(request,response,next) {
    try{
        response.json(courses)
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
