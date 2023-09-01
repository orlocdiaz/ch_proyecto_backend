const mongoose = require('mongoose');
const Product = require('../models/Product');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;
