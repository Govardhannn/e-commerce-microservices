import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import { getCart } from "../controllers/cart.controler.js";
import { validateAddItemToCart } from "../middleware/validator.middleware.js";

const router = express.Router();
// post items with the middlware with validiation 
router.post(
  "/items",
  validateAddItemToCart,
  createAuthMiddleware(["user"]),
  getCart,
);

export default router;
