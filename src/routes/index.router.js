import { Router } from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from './products.router.js';
import { getCart, addCart, addCartProduct } from './cart.router.js';

const router = Router();

//* Products routes
router.get('/api/products/:id?', getProducts);
router.post('/api/products', addProduct);
router.put('/api/products/:pid', updateProduct);
router.delete('/api/products/:pid', deleteProduct);

//* Cart routes
router.get('/api/carts/:cid?', getCart);
router.post('/api/carts', addCart);
router.post('/api/carts/:cid/product/:pid', addCartProduct);

export default router;
