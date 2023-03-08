import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose.set("strictQuery", false);
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin:Qz6twENzsdqeap2S@cluster0.okm1bie.mongodb.net/BlockApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(
      `Connected to Database and listening to http://localhost:${PORT}`
    )
  )
  .catch((err) => console.log(err));
