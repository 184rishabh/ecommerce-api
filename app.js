const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const authroute=require('./routes/auth')
const userroute=require('./routes/user');
const productroute=require('./routes/product');


const app=express();
dotenv.config();
app.use(express.json());

app.use('/api/user',userroute);
app.use('/api/auth',authroute);
app.use('/api/product',productroute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>
console.log('database connected')).catch((err)=>{
    console.log(err);
})


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})