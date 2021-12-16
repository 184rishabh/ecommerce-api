const mongoose=require('mongoose');

const orderschema=new mongoose.Schema(
    {
        paymentid:{
            type:String,
            required:true,
        },
        userid:{
            type:String,
            required:true,
        }, 
        products:[
            {
                productid:{
                    type:String,
                },
                quantity:{
                    type:Number,
                    default:1,
                },
                title:{
                    type:String,
                }
            },
        ],
        amount:{
            type:Number,
            required:true,
        },
        address:{
            type:Object,
            required:true,
        },
        status:{
            type:String,
            default:"pending",
        }
       
    },{timestamps:true}

);
module.exports=mongoose.model('Order',orderschema);