import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/order.contoller.js";

const router = express.Router();

router.post("/", createAuthMiddleware(["user"]),
 createOrder);

export default router;
