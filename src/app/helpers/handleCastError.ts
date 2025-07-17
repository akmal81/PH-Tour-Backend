/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interfaces/error.type"

export const handlerCastError = (err: mongoose.Error.CastError):TGenericErrorResponse => {


    return {
        statusCode: 400,
        message: "Invalid mongoDB ObjectId, Please provide valid id"
    }
}