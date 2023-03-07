import express from "express";
import { getAllUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);

export default userRouter;
