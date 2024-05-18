import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes

// Error Handler

export default app;
