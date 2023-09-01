const Cart = require('../models/Cart');
const MyError = require('../utils/myError');

class CartsService {
  get = async (id) => {
    try {
      const data = await Cart.findOne(id).lean();
      return data;
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to get cart!'
      );
    }
  };

  add = async (cart) => {
    try {
      await Cart.create(cart);
      return cart;
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to add cart!'
      );
    }
  };
}

module.exports = new CartsService();
