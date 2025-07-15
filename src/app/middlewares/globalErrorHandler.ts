/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handlerCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleZodError } from "../helpers/handleZodError";
import { TErrorSource } from "../interfaces/error.type";


export const globalErrorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {


    if(envVars.NODE_ENV === "development"){
        console.log(err)
    }

    let errorSources: TErrorSource[] = []
    let statusCode = 500;
    let message = `Something went wrong ${err} from global error`

    // duplicat email / id
    if (err.code === 11000) {
        console.log("duplicate error", err.message);

        const simplifiedError = handlerDuplicateError(err)

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    // custError /object id error

    else if (err.name === "CastError") {
        const simplifiedError = handlerCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }


    // zod validation error
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as TErrorSource[];
    }

    // mongoose validation error
    else if (err.name === "ValidationError") {

        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSource[];
        message = simplifiedError.message

    }

    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }

    else if (err instanceof Error) {
        statusCode = 500
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
})