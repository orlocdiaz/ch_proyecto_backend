const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = 'products';

const categories = ['Soda', 'Sweet Tea', 'Isotonic Beverage'];

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: categories,
  },
  thumbnails: {
    type: [String],
  },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

module.exports = Product;
