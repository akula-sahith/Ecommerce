const express= require("express")
const router=express.Router() 
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const User= require("../models/User")

router.post("/register",async (req,res)=>{
    try{
        const {name,email,password,mobile,isVendor}=req.body 
        console.log("----------",name,email,password,mobile,isVendor)
        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassword,mobile,isVendor
        })
        return res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        console.log("error from register",err)
        return res.status(500).json({message:"Error in server"})
    }
})

router.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(100).json(({"message" : "User not found"}))
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(401).json({"message":"Invalid credentials"})
        }else{
            console.log(user.mobile)
            const token = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )
            console.log(user.isVendor)
            return res.status(200).json({"message":"Login Successful","userRole":user.isVendor,"token":token})
        }
    }catch(err){
        return res.status(500).json({"message":"Internal server error"})
    }
})

router.get("/user",async (req,res)=>{
    const usedId = req.id
    console.log("User ID from token:", usedId)
})


module.exports=router