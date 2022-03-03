import { Schema} from "express-validator";


/**
 * Schema that will be use as the argument of the function
 * checkSchema from the <a href="https://express-validator.github.io/docs/schema-validation.html">
 *     express-validator package.</a>
 * - Since we're using typescript we can set the const type to Schema
 * - After the checkSchema function is ran we can obtain the errors by
 * calling the validationResult function from the express-validator package.
 * - The checkSchema function will search for each field in 3 different places:
 * Header, URL Params and inside the body.
 */
export const CreateCourseValidation: Schema = {
    year: {
        in: ['body'], // the field is expected to be in the request body.
        toFloat: true, // the field is expected to be number
        isFloat: {
            errorMessage: 'Revise el campo año, año debe ser de tipo númerico', // Friendly error
            options: { min: 1, max:9 }, // The field must be a number equal or greater than 1 and equal or less than 9
        },
    },
    section: {
        in: ['body'],
        isLength: {
            errorMessage: 'La cátedra debe ser exactamente de longitud 1, ej A',
            options: { min: 1, max:1 },
        },
    },
    shift : {
        in: ['body'],
        /* This is a way to handle enum fields, if the value is different
        from the given options the validation will fail.
        */
        isIn: {
            options: [['mañana', 'tarde', 'noche']],
            errorMessage: 'El turno debe ser un de los siguientes: mañana, tarde, noche'
        }
    },
    school: {
        in: ['body'],
        isString:{
            errorMessage:'La escuela debe ser un cadena de caracteres'
        }
    },
    subject : {
        in: ['body'],
        isString: {
            errorMessage: 'La materia debe ser un cadena de caracteres'
        },
        isLength: {
            errorMessage: 'La materia debe ser de al menos 3 letras y máximo 15',
            options: { min: 3, max:15 },
        },
    },
    /* Since Schedule is an array of objects we have to use wildcard notation,
    with schedule.*.day we're saying that every object has to have a key called day
    and that the value needs to be one of the listed inside options
     */
    'schedule.*.day':{
        in:['body'],
        isIn:{
            options:[['lunes','martes', 'miercoles', 'jueves', 'viernes','sabado','domingo']],
            errorMessage: 'El día debe ser uno de los siguientes: lunes, martes, miercoles, jueves, viernes, sabado, domingo'
        }
    },
    /* Same as with the day key, time needs to be present inside every object of the schedule array
    but in this case we're using match to check for a pattern `number-number`
    */
    'schedule.*.time':{
        in:["body"],
        matches:{
            options: [/([0-9]-[0-9])/],
            errorMessage: 'Formato invalido de hora, ej: 9-10'
        }
    }
}

export const UpdateCourseValidation: Schema = {
    courseId: {
      in: ['params'],
      isString: {
          errorMessage: 'El id del curso tiene que estar presente en la URL'
      }
    },
    year: {
        optional:true, // to update a course we don't need all the fields to be present
        in: ['body'], // the field is expected to be in the request body.
        isFloat: {// the field is expected to be number
            errorMessage: 'Revise el campo año, año debe ser de tipo númerico', // Friendly error
            options: { min: 1, max:9 }, // The field must be a number equal or greater than 1 and equal or less than 9
        },
    },
    section: {
        optional:true,
        in: ['body'],
        isLength: {
            errorMessage: 'La cátedra debe ser exactamente de longitud 1, ej A',
            options: { min: 1, max:1 },
        },
    },
    shift : {
        optional:true,
        in: ['body'],
        /* This is a way to handle enum fields, if the value is different
        from the given options the validation will fail.
        */
        isIn: {
            options: [['mañana', 'tarde', 'noche']],
            errorMessage: 'El turno debe ser un de los siguientes: mañana, tarde, noche'
        }
    },
    school: {
        optional:true,
        in: ['body'],
        isString:{
            errorMessage:'La escuela debe ser un cadena de caracteres'
        }
    },
    subject : {
        optional:true,
        in: ['body'],
        isString: {
            errorMessage: 'La materia debe ser un cadena de caracteres'
        },
        isLength: {
            errorMessage: 'La materia debe ser de al menos 3 letras y máximo 15',
            options: { min: 3, max:15 },
        },
    },
    schedule:{
      optional: true,
    },
    /* Since Schedule is an array of objects we have to use wildcard notation,
    with schedule.*.day we're saying that every object has to have a key called day
    and that the value needs to be one of the listed inside options
     */
    'schedule.*.day':{
        in:['body'],
        isIn:{
            options:[['lunes','martes', 'miercoles', 'jueves', 'viernes','sabado','domingo']],
            errorMessage: 'El día debe ser uno de los siguientes: lunes, martes, miercoles, jueves, viernes, sabado, domingo'
        }
    },
    /* Same as with the day key, time needs to be present inside every object of the schedule array
    but in this case we're using match to check for a pattern `number-number`
    */
    'schedule.*.time':{
        in:["body"],
        matches:{
            options: [/([0-9]-[0-9])/],
            errorMessage: 'Formato inválido de hora, ej: 9-10'
        }
    }
}
