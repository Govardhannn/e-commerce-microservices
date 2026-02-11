import express from "express";

import {
  registerUserValidations,
  loginUserValidations,
  addUserAddressValidations,
} from "../middleware/validator.middleware.js";

import {
  authUser,
  loginUser,
  logoutUser,
  getUser,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// auth  - working - fine
router.post("/register", registerUserValidations, authUser);
router.post("/login", loginUserValidations, loginUser);
router.post("/logout", authMiddleware, logoutUser);

// user - working - fine
router.get("/users/me", authMiddleware, getUser);

// addresses   -- working - fine
router.get("/users/me/addresses", authMiddleware, getUserAddresses);

// - working - fine
router.post(
  "/users/me/addresses",
  authMiddleware,
  addUserAddressValidations,
  addUserAddress,
);

router.delete(
  "/users/me/addresses/:addressId",
  authMiddleware,
  deleteUserAddress,
);

export default router;
