const express=require('express');
const router=express.Router();
const Cart=require('../models/Cart');
const { verifytokenauthorization, verifytokenandadmin, verifytoken } = require('./verifytoken');

//create cart
 router.post("/",verifytoken,async(req,res)=>{
    
    const newcart=new Cart(
      req.body,
    );
   try{
         const savecart=await newcart.save();
         res.status(200).send(savecart);
   }
   catch(err)
   {
       res.status(500).send("cart can not be created");
   }
 });

//update cart
router.put("/:id",verifytokenauthorization,async(req,res)=>{

     try{
        const updatecart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).send(updatecart);
     }
     catch(err){
          res.status(500).send("cart can not be updated");
     }
});

//delete cart
router.delete("/:id",verifytokenauthorization,async(req,res)=>{

    try{
        const deletecart=await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send(deletecart);
    }
    catch(err){
        res.status(500).send("cart was not able to delete");
    }
});

//get user own cart
router.get("/find/:userid",verifytokenauthorization,async(req,res)=>{//here id is user id
 try{
     const cart= await Cart.findOne({userid:req.params.userid});
     res.status(200).send(cart);
 }
 catch(err)
 {
     res.status(500).send(err);
 }
});

//get all cart

router.get("/",verifytokenandadmin,async(req,res)=>{

    try{
        const carts=await Cart.find();//all carts only admin can see
        res.status(200).send(carts);

    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports=router;  