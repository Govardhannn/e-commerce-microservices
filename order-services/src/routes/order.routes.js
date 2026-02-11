import express from "express";
import { createAuthMiddleware } from "../middlewares/auth.middleware.js";
import { createOrderValidation, updateAddressValidation } from "../middlewares/validation.middleware.js";
import { cancelOrderById, createOrder, getMyOrders, getOrderById, updateOrderAddress } from "../controllers/order.controller.js";
const router = express.Router();

// API is working - Fine
router.post(
  "/",
  createAuthMiddleware(["user"]),
  createOrderValidation,
  createOrder,
);
// API is working - Fine
router.post("/profile", createAuthMiddleware(["user"]), getMyOrders);
// API is working - Fine
router.post('/:id/cancel', createAuthMiddleware(["user"]), cancelOrderById)
// API is working - Fine
router.patch('/:id/address', createAuthMiddleware(["user"]), updateAddressValidation, updateOrderAddress)
// API is working - Fine
router.get('/:id', createAuthMiddleware(["user", "admin"]), getOrderById)
export default router;




 