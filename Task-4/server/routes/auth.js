import express from "express"
import {register,login,logout} from "../controllers/auth.js"
import {checkRegister} from "../utils/checkRegister.js"

const router=express.Router();

router.post("/register",checkRegister,register);
router.post("/reregister",register);
router.post("/login",login);
router.post("/logout",logout);

export default router;

