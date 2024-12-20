const mongoose= require('mongoose');

const shoeSchema=new mongoose.Schema({
    id:{type:String,unique:true,required:true},
    title:{type:String,required:true},
    price:{type:Number,required:true},
    detail:{type:String,required:true},
    img:{type:String,required:true}
})

const ShoeModel=mongoose.model('Shoe',shoeSchema);
module.exports=ShoeModel