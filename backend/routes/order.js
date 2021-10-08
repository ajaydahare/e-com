import express from "express";
import {getUserById,pushOrderInPurchaseList} from "../controllers/user.js";
import {isSignedIn, isAuthenticated, isAdmin} from "../controllers/auth.js";
import {updateStock} from "../controllers/product.js";
import  {createOrder, getOrderById,getAllOrders,updateOrderStatus,getOrderStatus} from "../controllers/order.js"

const router=express.Router();

router.param("userId",getUserById);
router.param("orderId" , getOrderById);

router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

router.get("/orders/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//order status
router.get("/order/status/:userId",isSignedIn,isAuthenticated,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateOrderStatus)




export default router;

