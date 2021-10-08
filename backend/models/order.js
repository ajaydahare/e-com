import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    price:Number,
    quantity:Number
},{timestamps:true});

const ProductCart=mongoose.model("ProductCart",ProductCartSchema);

const orderSchema =new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:String},
    status:{
        type:String,
        default:"received",
        enum:["received","shipped","processing","cancelled","delivered"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);

export {Order,ProductCart};