/* eslint-disable @typescript-eslint/no-non-null-assertion */

import AppError from "../../errorHelpers/AppError";
// import { IUser } from "../user/user.interface"
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";

import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken} from "../../utils/user.Tokens";
import { JwtPayload } from "jsonwebtoken";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//     const { email, password } = payload;
//     const isUserExist = await User.findOne({ email });

//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Emamil does not exsit");
//     }

//     const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

//     if (!isPasswordMatched) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
//     }

//     const userTokens = createUserTokens(isUserExist)

//     // delete password form isUserExist
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = isUserExist.toObject();

//     return {
//         // email: isUserExist.email
//         accessToken: userTokens.accessToken,
//         refreshToken: userTokens.refreshToken,
//         user: rest
//     }
// }

const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }
}

// resetPassword
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match")
    }
    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save()
    
    return true;
}


export const AuthServices = {
    // credentialsLogin,
    getNewAccessToken,
    resetPassword
}