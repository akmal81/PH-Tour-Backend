/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
// import AppError from "../../errorHelpers/AppError";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCodes.CREATED,
        message: "User Created Successfully",
        data: user,
    })
});

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;
    //    const token = req.headers.authorization;
    //    const varifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;
    
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifyToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCodes.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCodes.CREATED,
        message: "all users retrive Successfully",
        data: result.data,
        meta: result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}