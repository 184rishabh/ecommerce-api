const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const {verifytoken,verifytokenauthorization, verifytokenandadmin}=require('./verifytoken');

//User update
router.put("/:id",verifytokenauthorization, async (req,res)=>{

     if(req.body.password)
     {
        req.body.password=bcrypt.hashSync(req.body.password,10)
     }
     try{
         const updateuser=await User.findByIdAndUpdate(req.params.id,{
             $set:req.body
         },{new:true});
         res.status(200).json(updateuser);

     }
     catch(err){
         res.status(500).send(err);
     }
})
//DELETE USER
router.delete('/:id',verifytokenauthorization,async(req,res)=>{
    try{   
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted");

    }
    catch(err){
       res.status(500).json({error:err})
    }
})
//get all user
router.get('/find',verifytokenandadmin,async(req,res)=>{

    try{
        const user=await User.find();
        res.status(200).json(user);

    }
    catch(err){
       res.status(500).json(err)
    }
})

module.exports=router;