import {  Router } from "express";
import { UserControllers } from "./user.controller";
// import z from "zod"
const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router