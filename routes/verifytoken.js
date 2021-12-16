const jwt=require('jsonwebtoken');

const verifytoken=(req,res,next)=>{

    const authheader=req.headers.token
    if(authheader)
    {
        const token=authheader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err)
            {
                res.status(403).json({error:"token not valid"});
            }
            req.user=user;
            next();
        });
    }
    else{
        return res.status(401).json("not authenicated");
    }
};
const verifytokenauthorization=(req,res,next)=>{
    verifytoken(req,res,()=>{
       
        if(req.user.id === req.params.id||req.user.isadmin)
        {
            next();
        }
        else{
            res.status(403).json("you are not allowed to do that");
        }
    });
};
const verifytokenandadmin=(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isadmin)
        {
            next();
        }
        else{
            res.status(403).json("you are not allowed");
        }
    });
};

module.exports={verifytoken,verifytokenauthorization,verifytokenandadmin};