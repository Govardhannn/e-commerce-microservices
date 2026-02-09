import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/products", router);

export default app;
