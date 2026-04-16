const express = require("express");
const router=express.Router() 
const User = require("../models/User")


router.get("/profile",async (req,res)=>{
  try{
    const userId = req.userId
    const user = await User.findById(userId)
    if(!user){
        return res.status(401).json({"message":"User not found"})
    }else{
        return res.status(200).json({"message":"User Fetched Successfully","user":user})
    }
  }catch(err){
    return res.status(500).json({"message":"Internal Server Error"})
  }
})

module.exports=router