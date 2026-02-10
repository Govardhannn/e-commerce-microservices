import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import {
  addItemToCart,
  getCart,
  updateItemQuantity,
} from "../controllers/cart.controller.js";

import {
  validateAddItemToCart,
  validateUpdateCartItem,
} from "../middleware/validator.middleware.js";

const router = express.Router();


// ✅ GET CART
router.get(
  "/",
  createAuthMiddleware(["user"]),
  getCart
);


// ✅ ADD ITEM
router.post(
  "/items",
  createAuthMiddleware(["user"]),
  validateAddItemToCart,
  addItemToCart
);


// ✅ UPDATE ITEM
router.patch(
  "/items/:productId",
  createAuthMiddleware(["user"]),
  validateUpdateCartItem,
  updateItemQuantity
);

export default router;
