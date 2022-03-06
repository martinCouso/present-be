import { Schema} from "express-validator";

export const AttendanceListValidationSheme: Schema = {
    date: {
        isDate: {
            errorMessage: 'La fecha debe ser valida. Por ejemplo: YYYY-MM-DD', // Friendly error
        },
        in: ['body'], // the field is expected to be in the request body.
        
    },
    'entries.*.fullName':{
        in: ['body'],
        isString: {
            errorMessage: 'El nombre y apellido debe ser una cadena de caracteres'
        }
    },
    'entries.*.studentId':{
        in: ['body'],
        isString: {
            errorMessage: 'El Id del estudiante es requerido'
        }
    },
    'entries.*.status':{
        in: ['body'],
        isString: {
            errorMessage: 'El estado del alumno debe ser una cadena de caracteres'
        },
        isIn: {
            options: [['presente', 'ausente', 'tarde']],
            errorMessage: 'El estado del alumno debe ser uno de los siguientes: presente, ausente, tarde'
        }
    },    
    courseId:{
        in: ['body'],
        errorMessage: 'El Id del curso debe estar presente',            
     
    }
}