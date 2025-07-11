/* eslint-disable no-console */

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("connected to db");

        server = app.listen(envVars.PORT, () => {
            console.log("Server is listening on port 5000")
        })

    } catch (error) {
        console.log(error)
    }
}
(async () => {

    await startServer();
    await seedSuperAdmin()
})()



// Unhandled Rejection
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected... Server Sutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };
    process.exit(1);
});
// unhandled Exception
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server Sutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };
    process.exit(1);
});
// sinterm
process.on("SIGTERM", (err) => {
    console.log("SIGTERM signal reveived... Server Sutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };
    process.exit(1);
});
process.on("SIGINT", (err) => {
    console.log("Uncaught Exception detected... Server Sutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };
    process.exit(1);
});

// test
// Promise.reject(new Error("I forgot to catch this error"));
// throw new Error("I forgot to handle this local error");

