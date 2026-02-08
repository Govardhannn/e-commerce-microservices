import express from "express"
import { registerUserValidations } from "../middleware/validator.middleware.js";
import { authUser } from "../controllers/auth.controller.js";
const router = express.Router();



router.post('/register', registerUserValidations , authUser)



export default router;