import express from "express";
import {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,daleteCategory} from "../controllers/category.js";
import {getUserById} from "../controllers/user.js";
import {isSignedIn, isAuthenticated, isAdmin} from "../controllers/auth.js";


const router=express.Router();

//param middleware
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,daleteCategory);



export default router

