import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  notFoundErr,
  globalErrHandler,
} from "../middlewares/globalErrHandler.js";
import authRouter from "../routes/authRouter.js";

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);

// Error Handler
app.use(notFoundErr);
app.use(globalErrHandler);

export default app;
