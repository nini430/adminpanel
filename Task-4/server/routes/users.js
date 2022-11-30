import express from "express";
import {getUsers,blockUsers, unblockUsers,deleteUsers} from "../controllers/users.js"
import {checkToken} from "../utils/checkToken.js"

const router=express.Router();

router.get("/",checkToken,getUsers);
router.put("/block",checkToken,blockUsers);
router.put("/unblock",checkToken,unblockUsers);
router.delete("/delete",deleteUsers);


export default router;

