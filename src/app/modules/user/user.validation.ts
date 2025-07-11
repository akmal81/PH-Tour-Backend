import z from "zod"
import { IsActive, Role } from "./user.interface"
export const createUserZodSchema = z.object({
    name: z.
        string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short. Minimum 2 charactor logn" })
        .max(50, { message: "Name too long" }),

    email: z.
        string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format" })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    // 1 upper case, 1 special character, 1 digit, 8 char min len
    password: z
        .string({ invalid_type_error: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(/(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter",
        })
        .regex(/(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])/, {
            message: "Password must contain at least 1 special character",
        })
        .regex(/(?=.*\d)/, {
            message: "Password must contain at least 1 number",
        }),

    phone: z
        .string()
        .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Phone number must be valid for Bangladesh. Format: +8801xxxxxxx or 01xxxxxxx")
        .optional(),

    address: z
        .string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
})


export const updateUserZodSchema = z.object({
    name: z.
        string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short. Minimum 2 charactor logn" })
        .max(50, { message: "Name too long" })
        .optional(),

    // 1 upper case, 1 special character, 1 digit, 8 char min len
    password: z
        .string({ invalid_type_error: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(/(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter",
        })
        .regex(/(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])/, {
            message: "Password must contain at least 1 special character",
        })
        .regex(/(?=.*\d)/, {
            message: "Password must contain at least 1 number",
        })
        .optional(),

    phone: z
        .string()
        .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, "Phone number must be valid for Bangladesh. Format: +8801xxxxxxx or 01xxxxxxx")
        .optional(),

    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
        
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),

    isDeleted: z
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),

    isVerified: z
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),

    address: z
        .string({ invalid_type_error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
})