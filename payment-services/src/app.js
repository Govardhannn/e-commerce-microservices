import cookieParser from "cookie-parser";
import express from "express";
import paymentRoute from "./routes/paymen.route.js";

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use('/api/payments', paymentRoute)



export default app;