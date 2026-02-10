import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

// ✅ central error handler
const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};


// ✅ ADD ITEM VALIDATION
export const validateAddItemToCart = [
  body("productId")
    // ⭐ no need for isString
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Product ID format"),

  body("qty")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  validateResult,
];


// ✅ UPDATE ITEM VALIDATION
export const validateUpdateCartItem = [
  param("productId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Product ID format"),

  body("qty")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  validateResult,
];
