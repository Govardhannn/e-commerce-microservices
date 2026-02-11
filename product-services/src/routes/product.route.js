import express from "express";
import multer from "multer";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsBYSeller,
  updateProduct,
} from "../controllers/product.controller.js";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import createProductValidators from "../validators/product.validation.js";
import { get } from "mongoose";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/products

router.post("/",
  createAuthMiddleware(["admin", "seller"]),
  upload.array("images", 5),
  createProductValidators,
  createProduct
);

router.get("/", getProducts);

router.patch("/:id", createAuthMiddleware(["seller"]), updateProduct);

router.delete("/:id", createAuthMiddleware(["seller"]), deleteProduct);

router.get("/seller", createAuthMiddleware([ "seller" ]), getProductsBYSeller);

// writing this down becz this will treat the /seller - it own part if written above

router.get("/:id", getProductById);
export default router;
