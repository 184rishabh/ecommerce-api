const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const { verifytokenauthorization, verifytokenandadmin } = require('./verifytoken');

//create product
 router.post("/",verifytokenandadmin,async(req,res)=>{
    
    const newproduct=new Product({
       title:req.body.title,
       desc:req.body.desc,
       img:req.body.img,
       categories:req.body.categories,
       size:req.body.size,
       color:req.body.color,
       price:req.body.price,
    });
   try{
         const saveproduct=await newproduct.save();
         res.status(200).send(saveproduct);
   }
   catch(err)
   {
       res.status(500).json({error:err});
   }
 });

//update product
router.put("/:id",verifytokenandadmin,async(req,res)=>{

     try{
        const updateproduct=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).send(updateproduct);
     }
     catch(err){
          res.status(500).send("product can not be updated");
     }
});

//delete product
router.delete("/:id",verifytokenandadmin,async(req,res)=>{

    try{
        const deleteproduct=await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteproduct);
    }
    catch(err){
        res.status(500).send("produt was not able to delete");
    }
});

//get product
router.get("/find/:id",async(req,res)=>{
 try{
     const findproduct= await Product.findById(req.params.id);
     res.status(200).send(findproduct);
 }
 catch(err)
 {
     res.status(500).send(err);
 }
});

//get all product
router.get("/",async(req,res)=>{
    const qnew=req.query.new;
    const qcategory=req.query.category;
    try{
        if(qnew)
        {
            products=await Product.find().sort({createdAt:-1}).limit(4);
            //finding new products
        }
        else if(qcategory)
        {
        
            products=await Product.find({
                categories:{
                    $in:[qcategory],
                }
            });
            //find product with category
        }
        else{
            products= await Product.find();
        }
        res.status(200).send(products);
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports=router;  