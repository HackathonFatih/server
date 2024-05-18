import dotenv from "dotenv";
import http from "http";
import app from "./app/app.js";
import { dbConnect } from "./config/dbConnect.js";

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 2020;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
