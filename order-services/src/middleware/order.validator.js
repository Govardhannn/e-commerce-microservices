import { body, validationResult } from "express-validator";

const respondWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

// ✅ CREATE ORDER
export const createOrderValidation = [
  body("shippingAddress")
    .exists()
    .withMessage("Shipping address is required")
    .bail()
    .isObject()
    .withMessage("Shipping address must be an object"),

  body("shippingAddress.street")
    .trim()
    .notEmpty()
    .withMessage("Street is required"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required")
    .matches(/^\d{4,10}$/)
    .withMessage("Invalid pincode"),

  body("shippingAddress.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required"),

  respondWithValidationErrors,
];


// ✅ UPDATE ADDRESS (optional fields allowed)
export const updateAddressValidation = [
  body("shippingAddress")
    .optional()
    .isObject()
    .withMessage("Shipping address must be an object"),

  body("shippingAddress.street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty"),

  body("shippingAddress.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty"),

  body("shippingAddress.state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty"),

  body("shippingAddress.pincode")
    .optional()
    .trim()
    .matches(/^\d{4,10}$/)
    .withMessage("Invalid pincode"),

  body("shippingAddress.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty"),

  respondWithValidationErrors,
];
