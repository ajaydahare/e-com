import express from "express";
import { isSignedIn, isAuthenticated } from "../controllers/auth.js";
import { getToken, processPayment } from "../controllers/paymentB.js";
import { getUserById } from "../controllers/user.js";

const router = express.Router();

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

export default router;
