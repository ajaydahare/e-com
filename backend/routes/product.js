import express from "express";
import {getProductById,getProduct,createProduct,photo,updateProduct,deleteProduct,getAllProduct,getAllUniqueCategory} from "../controllers/product.js";
import { getUserById } from "../controllers/user.js";
import {isSignedIn,isAuthenticated,isAdmin} from "../controllers/auth.js";

const router=express.Router();

router.param("userId",getUserById)
router.param("productId",getProductById);

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);
router.get("/products",getAllProduct); 

router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

router.get("/products/categories",getAllUniqueCategory)






export default router;