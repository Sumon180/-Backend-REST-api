import express from "express";
import { getAllUser, signup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signup);
userRouter.post("/login", signup);

export default userRouter;
