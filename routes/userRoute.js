import express from "express";
import { getAllUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUser);

export default router;
