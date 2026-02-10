import express from "express";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import {
  addItemToCart,
  getCart,
  updateItemQuantity,
} from "../controllers/cart.controler.js";
import {
  validateAddItemToCart,
  validateUpdateCartItem,
} from "../middleware/validator.middleware.js";

const router = express.Router();
// post items with the middlware with validiation
router.post(
  "/items",
  validateAddItemToCart,
  createAuthMiddleware(["user"]),
  getCart,
);

router.post(
  "/items",
  validateUpdateCartItem,
  createAuthMiddleware,
  addItemToCart,
);

router.patch(
  "/items/:productId",
  validateUpdateCartItem,
  createAuthMiddleware(["user"]),
  updateItemQuantity,
);
export default router;
