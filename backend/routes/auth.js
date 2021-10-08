import express from "express";
import {signout,signup,signin,isSignedIn} from "../controllers/auth.js";
import {check,validationResult} from "express-validator";

const router=express.Router();

router.post("/signup",[
check("name","Name shoud be atleast 3 char ").isLength({min:3}),
check("email","Enter valid email").isEmail(),
check("password","Password length should be 6 char log ").isLength({min:6})],
signup);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:3})],
    signin);
router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})

export default router;

