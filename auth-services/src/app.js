import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";



app.use(cookieParser());
app.use(express.json())

app.use("/api/auth" , router)






export default app;
