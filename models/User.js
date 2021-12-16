const mongoose=require('mongoose');

const userschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isadmin:{
            type:Boolean,
            default:false,
        },
        address:{
            type:String
        }

    },{timestamps:true}

);
module.exports=mongoose.model('User',userschema);