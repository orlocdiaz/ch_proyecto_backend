const Product = require('../models/Product');
const MyError = require('../utils/myError');

class ProductsService {
  get = async (findParams, limit, sort) => {
    try {
      if (limit) {
        const data = await Product.paginate(findParams, limit);
        return data;
      } else if (findParams) {
        const data = await Product.find(findParams).sort(sort).lean();
        return data.length > 1 ? data : data[0];
      } else {
        const data = await Product.find().sort(sort).lean();
        return data;
      }
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to get products!'
      );
    }
  };

  add = async (product) => {
    try {
      await Product.create(product);
      return product;
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to add product!'
      );
    }
  };

  update = async (id, product) => {
    try {
      const updated = await Product.updateOne(id, product);
      return updated;
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to update product!'
      );
    }
  };

  delete = async (id) => {
    try {
      const deleted = await Product.deleteOne(id);
      if (deleted.deletedCount) {
        return {
          status: 'Success!',
          message: `Product with {id: ${id.id}} was deleted successfully!`,
        };
      }
    } catch (error) {
      throw new MyError(
        500,
        'Internal Error',
        error.message || 'Unable to delete product!'
      );
    }
  };
}

module.exports = new ProductsService();
