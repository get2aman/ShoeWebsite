const express =require('express')
const router=express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const User=require('../models/userSchema');


//user register
router.post('/signup',async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        
        const mail= await User.findOne({email});
        const name=await User.findOne({username});
        if(mail){
            res.json({message:"Email already exist"})
        }
        if(name){
            res.json({message:"Username already exist"})
        }
        const hashPass=await bcrypt.hash(password,10)
        const response= await User({username,email,password:hashPass});
        await response.save();
        res.status(200).json({message:"User Register Sucessfully"})
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username});
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ UserId: User._id }, 'User-secret-key');

        res.status(200).json({message:"Logged in Sucessfully",token,userid:user._id})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports=router