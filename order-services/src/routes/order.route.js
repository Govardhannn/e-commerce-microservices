import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/order.contoller.js";
// import { createOrderValidation } from "../models/order.validator.js";

const router = express.Router();

router.post(
  "/",


  createOrder,
);


export default router;
