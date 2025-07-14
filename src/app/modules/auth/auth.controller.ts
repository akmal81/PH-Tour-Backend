import { catchAsync } from "../../utils/catchAsync"
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/user.Tokens";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


// login and access token 
const credentialsLogin = catchAsync(async (req: Request, res: Response) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)


    //    ser access token in cookies
    // res.cookie("accessToken",loginInfo.accessToken,{
    //      httpOnly:true, //must use 
    // secure:false //must use
    // })


    // set refresh in cookies
    // res.cookie("refreshToken", loginInfo.refreshToken,{
    //     httpOnly:true, //must use 
    //     secure:false //must use

    // })

    setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo
    })
})

// refresh token
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken
    // const refreshToken = req.headers.authorization as string
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "NO refresh token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true, //must use 
        secure: false //must use
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access token retrived Successfully",
        data: tokenInfo
    })
})

// reset password
const resetPassword = async (req: Request, res: Response) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password change successfully",
        data: null
    })
}

// logout
const logout = catchAsync(async (req: Request, res: Response) => {
    // clear cookie
    res.clearCookie("accessToken", {
        httpOnly: true, //must use 
        secure: false, //must use
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true, //must use 
        secure: false, //must use
        sameSite: "lax"
    })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User LoggOut Successfully",
        data: null
    })
})

// google login
const googleCallBackController = catchAsync(async (req: Request, res: Response) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1)
    }

    // /booking=> booking, => "/" => ""

    const user = req.user;
    

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }
    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(`${envVars.FORNTEND_URL}/${redirectTo}`)
})




export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallBackController
}