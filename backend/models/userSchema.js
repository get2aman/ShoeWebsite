const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    shoeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: [cartItemSchema]
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
