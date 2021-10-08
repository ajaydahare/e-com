import User from "../models/user.js";
import {Order} from "../models/order.js";

//middleware
export const getUserById=(req,res,next,id)=>{
    User.findById(id,(error,user)=>{
        if(error || !user){
            res.status(400).json({
                error:"no user found in DB"
            })
        }
        req.profile=user;
        next();
    })
}

export const getUser=(req,res)=>{

    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
}

export const updateUser=(req,res)=>{``
       User.findByIdAndUpdate(
           {_id:req.profile._id},
           {$set:req.body},
           {new:true,useFindAndModify:false},
           (error,user)=>{
               if(error){
                   return res.status(400).json({
                    error:"you are not able to update profile"
                   });
               }
               user.salt=undefined;
               user.encry_password=undefined;
               user.createdAt=undefined;
               user.updatedAt=undefined;
               res.json(user) 
           }
       ) 
}

export const userPurchaselist=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((error,order)=>{
        if(error){
            return res.status(400).json({
                error:"no order in this account"
            })
        }
        return res.json(order);
    })
}

export const pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[];
    req.body.order.products.forEach((product)=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
    });

    //push purchases list into the db
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
       (error,purchse)=>{
        if(error){
            return res.status(400).json({
                error:"unble to save purchase list "
            })
        }
        next();
       }
    )
}
