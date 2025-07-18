const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user');
const router=express.Router()

router.post('/register',async(req,res)=>{
    const{name, email, password, role, college, skills}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser = new User({ name, email, password: hashedPassword, role, college, skills });
    await newUser.save();
    res.status(201).json({message:"user registered"})
})

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;

    const foundUser=await User.findOne({email});
    if(!foundUser||!(await bcrypt.compare(password,foundUser.password)))
        return res.status(401).json({message:"invalis crindiancals"})
    const token=jwt.sign({
    id:foundUser._id,role:foundUser.role},process.env.JWT_SECRET);
        res.json({token,user:foundUser})
    })

module.exports=router;

