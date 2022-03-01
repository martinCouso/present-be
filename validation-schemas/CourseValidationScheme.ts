import {checkSchema} from "express-validator";
import {Schema} from "mongoose";

export const UpdateCourseValidationScheme = {
    year: {
        // The location of the field, can be one or more of body, cookies, headers, params or query.
        // If omitted, all request locations will be checked
        in: ['body'],
        errorMessage: 'Revise el campo año, año debe ser de tipo númerico',
        // Sanitizers can go here as well
        toFloat: true,
        isFloat: {
            errorMessage: 'La edad debe ser un entero entre 3 y 123',
            // Multiple options would be expressed as an array
            options: { min: 3, max:123 },
        },
    },
    section: String,
    shift : String,
    school: String,
    subject: String,
    schedule:[{day: String, time: String}],
    teacherId: Schema.Types.ObjectId,
}
