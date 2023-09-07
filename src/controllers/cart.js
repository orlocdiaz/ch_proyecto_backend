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

  addToCart = async (req, res) => {
    const cid = req.params.cid
    const product = await req.body
    const cart = await this.manager.addTo(cid, product)
    res.status(200).json({ status: "Success!", payload: cart })
  }

  removeFromCart = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const cart = await this.manager.removeFrom(cid, pid)
    res.status(200).json({ status: "Success!", payload: cart })
  }
  
  deleteCart = async (req, res) => {
    const cid = req.params.cid
    const cart = await CartsService.delete(cid)
    res.status(200).json({ status: "Success!", payload: cart })
  }
}

module.exports = new CartsController();
