import express from "express"
import { loginUserValidations, registerUserValidations } from "../middleware/validator.middleware.js";
import { authUser, getUser, loginUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();



router.post('/register', registerUserValidations , authUser)

router.post('/login',loginUserValidations, loginUser)

router.get('/profile', authMiddleware , getUser)

router.get('/logout', loginUser)
export default router;