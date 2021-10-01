const { User } = require("../models");
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()
exports.createUser=(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        let user=await User.findOne({where:{email:email}});
        if(user) res.status(400).json({msg:"User alreedy exist"});
        const newUser={
            username,
            email,
            password,
            role:user
        }
        const salt=await bcrypt.genSalt(10)
        newUser.password=await bcrypt.hash(password,salt)
        const data=await User.create(newUser);
      const token= jwt.sign({id:data.id},process.env.JWT_KEY,{expiresIn:'1d'})
       res.status(200).json({
        status:"Success",
        token,
        data:data,
    });
    } catch (error) {
        res.send(error.message)
    }
}

exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        let user=await User.findOne({where:{email:email}});
        if(!user) res.status(400).json({msg:"User does not exist"});
        const correct=await bcrypt.compare(password,user.password)
        if(!correct)  res.status(400).json({msg:"Enter valid password"});
        jwt.sign({id:user.id},process.env.JWT_KEY,{expiresIn:'1d'})
        res.status(200).json({
         status:"Success",
         token,
         data:data,
     });
      
    } catch (error) {
        next(error)
    }
}
exports.protect=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({msg:"You are not logged in! Please login to get access."})
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const currentUser=await User.findOne({
            where: {
                id:decoded.id,
            },
        });
        if(!currentUser){
            return res.status(401).json({msg:"The user belonging to this token does no longer exist."})
        }
        req.user=currentUser;
        next();
    } catch (err) {
        if(err.name === "JsonWebTokenError"){
            return res.status(401).json({msg:"Invalid token. Please login again!"})
         
        }
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({msg:"Your token has expired! Please login again"})
        }
      next(err);  
    }
};