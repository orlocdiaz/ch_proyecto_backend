const ProductsService = require('../services/products');
const render = require('../utils/render');
const Manager = require('../utils/manager');

class ViewsController {
  constructor() {
    this.manager = new Manager(ProductsService);
  }

  //* RENDER HOME
  renderHome = async (req, res) => {
    try {
      const products = await this.manager.getAll();
      console.log(typeof products);
      await res.render('home', products);
    } catch (error) {
      res.render('error', { message: error.message });
    }
  };

  //* RENDER PRODUCTS
  renderProducts = async (req, res) => {
    try {
      const products = await this.manager.getAll();
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
}

module.exports = new ViewsController();
