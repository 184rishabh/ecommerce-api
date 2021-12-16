const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const Razorpay=require('razorpay');
const shortid=require('shortid');
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
router.get("/find/:id",verifytokenauthorization,async(req,res)=>{//here id is user id
 try{
     const order= await Order.find({userid:req.params.id});
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

var  razorpay=new Razorpay({
    key_id:'rzp_test_vBmwkeZA0bm004',
    key_secret:'9veu0Y1RXPRp3qqt3eHLky8B'
    });


router.post('/razorpay',async (req,res)=>{
    console.log("razorpay")
    console.log(req.body);
    const amount=req.body.amount+'00';
    const currency='INR';
    const payment_capture=true
    const options={
        amount:amount,
        currency:currency,
        receipt:shortid.generate(),
        payment_capture:payment_capture
    }
    try{
        const response=await razorpay.orders.create(options);
        console.log(response)
        res.json({id:response.id,amount:amount});
    }
    catch(e)
    {
        console.log(e);
    }
})

router.post('/pay-order', async (req, res) => {
    try {
        const neworder=new Order(
            {
                paymentid:req.body.razorpayPaymentId,
                userid:req.body.userid,
                products:req.body.products,
                amount:req.body.amount,
                address:req.body.address,
            }

          );
         try{
               const saveorder=await neworder.save();
               console.log("order creation")
               res.status(200).send({ msg: 'Order created successfully successfull'});
         }
         catch(err)
         {
             console.log(err);
             res.status(500).send("Order can not be created");
         }

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

module.exports=router;  