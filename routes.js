import express from "express";
// import { getAllUser } from "../controllers/userController";

const route = express.Router();

route.get("/", function (req, res) {
    res.json({ 'test': 'ok' });
});

export default route;
