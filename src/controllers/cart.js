const CartsService = require('../services/cart');
const Manager = require('../utils/manager');
const MyError = require('../utils/myError');

class CartsController {
  constructor() {
    this.manager = new Manager(CartsService);
  }

  getCart = async (req, res) => {
    const _id = req.params.cid;

    const cart = await this.manager.getFound({ _id });
    res.status(200).json(cart.products);
    return cart;
  };

  addCart = async (req, res) => {
    const cart = await req.body;
    await this.manager.add(cart);
    res.status(200).json({ status: 'Success!', cart });
  };
}

module.exports = new CartsController();
