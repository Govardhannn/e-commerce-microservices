import express from "express";
import multer from "multer";
import { createProduct, getProducts } from "../controllers/product.controller.js";
import createAuthMiddleware from "../middleware/auth.middleware.js";
import createProductValidators from "../validators/product.validation.js";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/products
router.post(
  "/",
  createAuthMiddleware(["admin", "seller"]),
  upload.array("images", 5),
  createProductValidators,
  createProduct,
);

router.get('/',getProducts )

// router.get('/:id',)

export default router;
