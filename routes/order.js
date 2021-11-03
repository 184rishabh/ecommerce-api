const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const { verifytokenauthorization, verifytokenandadmin, verifytoken } = require('./verifytoken');

//create order
 router.post("/",verifytoken,async(req,res)=>{
    
    const neworder=new Order(
      req.body,
    );
   try{
         const saveorder=await neworder.save();
         res.status(200).send(saveorder);
   }
   catch(err)
   {
       res.status(500).send("Order can not be created");
   }
 });

//update order
router.put("/:id",verifytokenandadmin,async(req,res)=>{

     try{
        const updateorder=await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).send(updateorder);
     }
     catch(err){
          res.status(500).send("order can not be updated");
     }
});

//delete order
router.delete("/:id",verifytokenandadmin,async(req,res)=>{

    try{
        const deleteorder=await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteorder);
    }
    catch(err){
        res.status(500).send("order was not able to delete");
    }
});

//get user order
router.get("/find/:userid",verifytokenauthorization,async(req,res)=>{//here id is user id
 try{
     const order= await Order.find({userid:req.params.userid});
     res.status(200).send(order);
 }
 catch(err)
 {
     res.status(500).send(err);
 }
});

//get all order

router.get("/",verifytokenandadmin,async(req,res)=>{

    try{
        const order=await Order.find();//all carts only admin can see
        res.status(200).send(order);

    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports=router;  