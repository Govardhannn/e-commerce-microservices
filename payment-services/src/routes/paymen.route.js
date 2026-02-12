import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import { createPayment, verifyPayment } from "../controllers/payment.controller.js";


const paymentRoute = express.Router();

// This route is working - Fine 
paymentRoute.post(
  "/create/:orderId",
  createAuthMiddleware(["user"]),
  createPayment,
);

paymentRoute.post('/verify', createAuthMiddleware(['user']), verifyPayment)

export default paymentRoute;
