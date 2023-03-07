import express from "express";
import { getAllUser } from "../controllers/userController";

const user = express.Router();

user.get("/", getAllUser);

export {user}