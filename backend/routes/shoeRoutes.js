const express=require('express');
const router=express.Router();
const ShoeModel = require('../models/shoeSchema');
const userModel = require('../models/userSchema');


//add shoedata in database
router.post('/addShoe',async(req,res)=>{
  try {
    const Shoe=req.body
    const response=await ShoeModel(Shoe);
    const success=await response.save();
    if(success){
      res.status(200).json({msg:"Shoe added successfully"})
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/cartdata',async (req,res)=>{
   try {
    const response = await ShoeModel.find()
    res.status(200).json(response)
   } catch (error) {
    console.log(error)
   }
})
router.get('/cartdata/:id',async (req,res)=>{
  try {
    const data=req.params.id
   const response = await ShoeModel.findById(data)
   res.status(200).json(response)
  } catch (error) {
   console.log(error)
  }
})

// router.post('/:id',async(req,res)=>{
//     try {
//         const data=req.params.id;
//         const userid=req.body.userid;
//         const shoe= await ShoeModel.findById(data);
//         const user=await userModel.findById(userid);
//         user.cart.push({shoeId:shoe._id,quantity:1})
//         await user.save();
//         res.json({message:'Added to Cart'})
//     } catch (error) {
//         res.status(500).json({message:error.message}) 
//     }
// })


//Add cart in user's cart 
// router.put('/:_id', async (req, res) => {
//     try {
//       const data = req.params.id; // Correct param name
//       const userid = req.body.userid;
//       const shoe = await ShoeModel.findById(data);
//       const user = await userModel.findById(userid);
//       const duplicate = user.cart.find(e => e.shoeId == data);
//       if (duplicate) {
//         return res.json({ message: "Already Added this Item" });
//       }
//       // Add new shoe to the cart
//       user.cart.push({
//         shoeId: shoe._id,
//         quantity: 1
//       });
//       await user.save();
//       res.json({ message: "Added to cart" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

router.put('/:id', async (req, res) => {
  try {
    const data = req.params.id; // Correct param name
    const userId = req.body.userId;
    
    // Check if userId and shoeId are provided
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const shoe = await ShoeModel.findById(data);
    const user = await userModel.findById(userId);
    console.log(shoe);
    console.log(user)
    if (!shoe || !user) {
      return res.status(404).json({ message: "Shoe or User not found" });
    }
    
    const duplicate = user.cart.find(e => e.shoeId.toString() === data);
    if (duplicate) {
      return res.json({ message: "Already Added this Item" });
    }

    // Add new shoe to the cart
    user.cart.push({
      shoeId: shoe._id,
      quantity: 1
    });
    await user.save();
    res.json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);  // Add logging for better error tracking
    res.status(500).json({ message: error.message });
  }
});


  

router.post('/cart/:id',async(req,res)=>{
    try {
        const userid=req.params.id;
        const user= await userModel.findById(userid).populate({
            path:"cart.shoeId"
        });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})


//show shoe details in cart page
router.get('/cart/:id',async(req,res)=>{
  try {
      const userid=req.params.id;
      const user= await userModel.findById(userid).populate({
          path:"cart.shoeId"
      });
      res.status(200).json(user)
  } catch (error) {
      res.status(500).json({message:error.message}) 
  }
})

//Increase the product quantity
router.put('/increase/:id',async(req,res)=>{
try {
  const shoeId=req.params.id;
  const userId=req.body.userId
  const user=await userModel.findById(userId)
  const cartItem=user.cart.find(e=>e.shoeId==shoeId)
  cartItem.quantity+=1;
  const response=await user.save();
  res.json(response)
} catch (error) {
  console.error(error)
  res.status(500).json({ message: "An error occurred", error: error.message })
}
})

//Decrease product quantity
router.put('/decrease/:id',async(req,res)=>{
  try {
    const shoeId=req.params.id;
    const userId=req.body.userId
    const user=await userModel.findById(userId)
    const index=user.cart.findIndex(e=>e.shoeId==shoeId)
    if(index===-1){
      return res.status(404).json({msg:"Product not found in cart"})
    }
    const cartProduct= user.cart[index]
    if(cartProduct.quantity>1){
      cartProduct.quantity--;
    }else{
      user.cart.splice(index,1)
    }
    const updateduser=await user.save()
    res.json(updateduser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "An error occurred", error: error.message })
  }
})

//Remove product from cart
router.put('/remove/:id',async(req,res)=>{
  try {const shoeId=req.params.id;
    const userId=req.body.userId;
    const user=await userModel.findById(userId)
    const index=user.cart.find(e=>e.shoeId===shoeId)
    user.cart.splice(index,1)
      const updateduser=await user.save()
      res.json(updateduser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "An error occurred", error: error.message })
  }
  
})



module.exports=router