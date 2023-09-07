const Cart = require("../models/Cart");
const MyError = require("../utils/myError");

class CartsService {
  get = async (cid) => {
    try {
      const data = await Cart.findOne(cid).lean();
      return data;
    } catch (error) {
      throw new MyError(
        500,
        "Internal Error",
        error.message || "Unable to get cart!"
      );
    }
  };

  add = async (cart) => {
    try {
      const newCart = await Cart.create(cart);
      return newCart;
    } catch (error) {
      throw new MyError(
        500,
        "Internal Error",
        error.message || "Unable to add cart!"
      );
    }
  };

  addTo = async (cid, product) => {
    const quantity = parseInt(product.quantity) || 1;
    let data = await Cart.findOneAndUpdate(
      {
        _id: cid,
        "products.product": product.product,
      },
      {
        $inc: {
          "products.$[elem].quantity": quantity,
        },
      },
      {
        multi: false,
        arrayFilters: [{ "elem.product": { $eq: product.product } }],
      }
    );
    if (!data) {
      data = await Cart.updateOne(
        { _id: cid },
        { $addToSet: {products: product} }
      );
    }
    return data;
  };

  removeFrom = async (cid, pid) => {
    const data = await Cart.updateOne(
      {
        _id: cid,
        "products.product": pid,
      },
      {
        $pull: {
          "products":{"product": pid}
        },
      }
      );
      return data
  }

  delete = async (cid) => {
    const data = await Cart.updateOne(
      { _id: cid },
      {
        $set: {
          "products": []
        }
      }
    )
    return data
  }
}

module.exports = new CartsService();
