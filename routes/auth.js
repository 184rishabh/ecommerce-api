const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//for login and register

//Register
router.post('/register',async (req,res)=>{
    
    const username=await User.findOne({username:req.body.username});
    const email=await User.findOne({email:req.body.email});
    if(username)
    {
       res.status(400).json({error:"user existing"})
    }
    else if(email)
    {
       res.status(400).json({error:"email existing"})
    }
    else{
        const newuser=new User({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10),
            address:req.body.address,
        });
        try{
            const saveuser=await newuser.save();
            res.status(200).json(saveuser);
    
        }catch(err){
             res.status(500).json(err);
        }
    }
})
// login
router.post('/login',async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user)
        {
            return res.status(400).json({error:'the user not found'});
        }
        const hashpass=bcrypt.compareSync(req.body.password,user.password);
        if(user && hashpass)
        {
            const token=jwt.sign({
                id:user._id,
                isadmin:user.isadmin,
            },process.env.JWT_KEY,{
                expiresIn:'1d'
            });
            return res.status(200).send({user,token});
        }
        else
        {
            res.status(500).json({error:'wrong password'});
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports=router;