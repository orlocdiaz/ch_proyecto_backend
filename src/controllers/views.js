const ProductsService = require('../services/products');
const CartsService = require('../services/cart');
const render = require('../utils/render');
const Manager = require('../utils/manager');

class ViewsController {
  constructor() {
    this.productsManager = new Manager(ProductsService);
    this.cartsManager = new Manager(CartsService);
  }

  //* RENDER LOGIN
  renderLogIn = async (req, res) => {
    try {
      await res.render("logIn");
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };

  //* RENDER REGISTER
  renderRegister = async (req, res) => {
    try {
      await res.render("register");
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };
  //* RENDER PROFILE
  renderProfile = async (req, res) => {
    try {
      await res.render("profile");
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };

  //* RENDER HOME
  renderProducts = async (req, res) => {
    try {
      const name = req.session.name;
      const role = req.session.role;
      console.log(role);
      const products = await this.productsManager.getAll();
      await res.render("products", { name, products, role });
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };

  //* RENDER PRODUCTS
  renderRTProducts = async (req, res) => {
    try {
      const products = await this.productsManager.getAll();
      await res.render("rtproducts", products);
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };

  //* RENDER CHAT
  renderChat = async (req, res) => {
    try {
      await res.render("chat");
    } catch (error) {
      res.render("error", { message: error.message });
    }
  };

  //* RENDER CART
  renderCart = async (req, res) => {
    const _id = req.params.cid;

    const cart = await this.cartsManager.getFound({ _id });
    await res.render("cart", cart.products);
  };
}

module.exports = new ViewsController();
