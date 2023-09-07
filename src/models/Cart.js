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
      quantity: {type: Number, default: 1},
    },
  ],
});

cartSchema.pre('findOne', function () {
  this.populate('products.product');
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;
