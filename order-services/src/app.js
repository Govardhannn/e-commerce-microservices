import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/order.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());



app.use("/api/orders", router);

export default app;
