import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  notFoundErr,
  globalErrHandler,
} from "../middlewares/globalErrHandler.js";
import authRouter from "../routes/authRouter.js";
import userRouter from "../routes/userRouter.js";

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

// Error Handler
app.use(notFoundErr);
app.use(globalErrHandler);

export default app;
