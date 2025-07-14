import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_ECPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_ECPIRES: string;
    BCRYPT_SALT_ROUND: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;

    GOOGLE_CLIENT_SECRET:string;
    GOOGLE_CLIENT_ID:string;
    GOOGL_CALLBACK_URL:string;
    EXPRESS_SESSION_SECRET:string;
    FORNTEND_URL:string

}
const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_ECPIRES", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "JWT_REFRESH_ECPIRES", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "GOOGLE_CLIENT_SECRET","GOOGLE_CLIENT_ID", "GOOGL_CALLBACK_URL","EXPRESS_SESSION_SECRET", "FORNTEND_URL"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,

        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_ECPIRES: process.env.JWT_ACCESS_ECPIRES as string,

        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_ECPIRES: process.env.JWT_REFRESH_ECPIRES as string,

        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,

        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGL_CALLBACK_URL: process.env.GOOGL_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FORNTEND_URL: process.env.FORNTEND_URL as string
    }
}

export const envVars = loadEnvVariables()