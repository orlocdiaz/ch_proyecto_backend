const ProductsService = require('../services/products');
const CartsService = require('../services/cart');
const render = require('../utils/render');
const Manager = require('../utils/manager');

class ViewsController {
  constructor() {
    this.productsManager = new Manager(ProductsService);
    this.cartsManager = new Manager(CartsService);
  }

  //* RENDER HOME
  renderHome = async (req, res) => {
    try {
      const products = await this.productsManager.getAll();
      await res.render('home', products);
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };

  //* RENDER PRODUCTS
  renderProducts = async (req, res) => {
    try {
      const products = await this.productsManager.getAll();
      await res.render('products', products);
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };

  //* RENDER CHAT
  renderChat = async (req, res) => {
    try {
      await res.render('chat');
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };

  //* RENDER CART
  renderCart = async (req, res) => {
    const _id = req.params.cid;
    console.log(_id);

    const cart = await this.cartsManager.getFound({ _id });
    await res.render('cart', cart.products);
  }
}

module.exports = new ViewsController();
