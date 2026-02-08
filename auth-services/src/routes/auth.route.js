import express from "express"
import { loginUserValidations, registerUserValidations } from "../middleware/validator.middleware.js";
import { authUser, loginUser } from "../controllers/auth.controller.js";
const router = express.Router();



router.post('/register', registerUserValidations , authUser)

router.post('/login',loginUserValidations, loginUser)

export default router;