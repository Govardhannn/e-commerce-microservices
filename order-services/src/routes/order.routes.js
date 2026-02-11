import express from "express";
import { createAuthMiddleware } from "../middlewares/auth.middleware.js";
import { createOrderValidation } from "../middlewares/validation.middleware.js";
import { createOrder } from "../controllers/order.controller.js";
const router = express.Router();

router.post(
  "/",
  createAuthMiddleware(["user"]),
  createOrderValidation,
  createOrder,
);

// router.post("/", createAuthMiddleware([ "user" ]), validation.createOrderValidation, orderController.createOrder)

// router.get("/me", createAuthMiddleware([ "user" ]), orderController.getMyOrders)

// router.post("/:id/cancel", createAuthMiddleware([ "user" ]), orderController.cancelOrderById)

// router.patch("/:id/address", createAuthMiddleware([ "user" ]), validation.updateAddressValidation, orderController.updateOrderAddress)

// router.get("/:id", createAuthMiddleware([ "user", "admin" ]), orderController.getOrderById)

export default router;
