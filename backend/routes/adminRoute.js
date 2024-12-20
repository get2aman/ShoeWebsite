const express=require('express');
const router=express.Router();
const ShoeModel = require('../models/shoeSchema');

router.post('/',async(req,res)=>{
    try {
        const Shoe=req.body
        const response= await ShoeModel(Shoe);
        const success= await response.save()
        if(success){
            res.status(200).json({message:'Shoe Addedd Sucessfully'})
        }
        
    } catch (error) {   
        res.status(500).json({message:error.message})
    }
})

module.exports=router;