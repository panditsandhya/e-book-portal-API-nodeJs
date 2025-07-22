import express from "express";
import { createUser, loginuser } from "./userController";

const userRouter = express.Router()

//routes
userRouter.post('/register',createUser);
userRouter.post('/login', loginuser);


export default userRouter;