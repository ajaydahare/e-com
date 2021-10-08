import express from "express";
import {makePayment} from "../controllers/makePayment.js"
const router=express.Router();


router.post("/stripepayment",makePayment)

export default router;