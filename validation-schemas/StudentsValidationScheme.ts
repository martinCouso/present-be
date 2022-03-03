import { Schema } from "express-validator";

export const StudentsValidationScheme: Schema = {
    fistName: {
        in: ['body'], // the field is expected to be in the request body.
        isString:{
            errorMessage:'El nombre debe ser un cadena de caracteres'
        }
    },
    lastName:{
        in: ['body'], // the field is expected to be in the request body.
        isString:{
            errorMessage:'El apellido debe ser un cadena de caracteres'
        }
    },
    age:{
        in: ['body'], // the field is expected to be in the request body.
        toFloat: true, // the field is expected to be number
        isFloat: {
            errorMessage: 'La edad debe ser de tipo númerico', // Friendly error
            options: { min: 1, max:99 }, // The field must be a number equal or greater than 1 and equal or less than 9
        },
    },
    observations:{
        in: ['body'],
        isString: {
            errorMessage: 'Las observaciones deben ser un cadena de caracteres',            
        },
    },
    onlineUser:{
        in: ['body'],
        isString: {
            errorMessage: 'El usuario del aula virtual debe ser un cadena de caracteres',            
        },
    },
    email:{
        in: ['body'],
        isEmail: {
            errorMessage: 'El email debe ser uno valido',            
        },
    },
    courseId:{
        in: ['body'],
        isString: {
            errorMessage: 'El curso debe ser un cadena de caracteres',            
        },
    }
}