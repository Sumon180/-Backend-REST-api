import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/userRoute";

const app = express();

mongoose.set("strictQuery", false);
mongoose.set("strictQuery", true);

app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://admin:Qz6twENzsdqeap2S@cluster0.okm1bie.mongodb.net/BlockApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(4000))
  .then(() =>
    console.log("Connected to Database and listening to http://localhost:5000")
  )
  .catch((err) => console.log(err));
