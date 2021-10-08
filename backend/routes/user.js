import express from "express";
import {getUserById,getUser,updateUser,userPurchaselist} from "../controllers/user.js";
import {isSignedIn,isAuthenticated,isAdmin} from "../controllers/auth.js"

const router=express.Router();

router.param("userId",getUserById);
router.get("/user/:userId" , isSignedIn ,isAuthenticated,getUser);
router.patch("/user/:userId" , isSignedIn ,isAuthenticated,updateUser);
router.get("order/user/:userId" , isSignedIn ,isAuthenticated,userPurchaselist);




export default router;