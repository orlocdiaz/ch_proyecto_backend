const ProductsService = require('../services/products');
const Manager = require('../utils/manager');
const MyError = require('../utils/myError');

class ProductsController {
  constructor() {
    this.duplicateValidations = ['title', 'code'];
    this.requiredFields = [
      'title',
      'description',
      'code',
      'price',
      'stock',
      'category',
    ];
    this.manager = new Manager(ProductsService);
  }

  //* GET ALL & LIMIT
  getProducts = async (req, res) => {
    const queries = req.query;
    const countQueries = Object.keys(queries).length;
    //* GET all elements validating sort
    const sort = queries.sort && { price: queries.sort };
    if (!countQueries || (sort && countQueries === 1)) {
      const products = await this.manager.getAll(sort);
      if (!products.length) {
        throw new MyError(200, 'Empty', 'No products yet!');
      }
      res.status(200).json(products);
      return products;
    }
    //* GET Limited & query
    else {
      const { limit, page, sort, ...findParams } = queries;

      //* Limited products that can have queries
      if (limit) {
        const limits = {
          limit,
          page: page || 1,
          sort: sort && { price: sort },
        };
        const URL = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const products = await this.manager.getLimited(findParams, limits, URL);

        res.status(200).json(products);
        return products.docs;

        //* Query products
      } else {
        const products = await this.manager.getFound(
          findParams,
          sort && { price: sort }
        );
        res.status(200).json(products);
        return products;
      }
    }
  };

  //* GET BY ID
  getProductById = async (req, res) => {
    const product = await this.manager.getFound(req.params);

    res.status(200).json(product);
    return product;
  };

  //* ADD
  addProduct = async (req, res) => {
    const product = {
      id: undefined,
      status: undefined,
      ...(await req.body),
    };

    //* Validations
    await this.manager.validateRequired(product, this.requiredFields);
    await this.manager.validateDuplicated(product, this.duplicateValidations);

    //* Generate ID
    const newId = await this.manager.generateId();
    product.id = newId;

    //* Set product status
    product.status = !product.status && true;

    const added = await this.manager.add(product);
    res.status(200).json({ status: 'Product added successfully!', added });
    return added;
  };

  //* UPDATE
  updateProduct = async (req, res) => {
    const pid = req.params.pid;
    const id = { id: pid };
    const update = req.body;

    const productById = await this.manager.getFound(id);

    await this.manager.validateUpdate(id, update);
    await this.manager.validateDuplicated(update, this.duplicateValidations, {
      id,
    });

    const product = { ...productById, ...update };

    await this.manager.validateRequired(product, this.requiredFields);
    const updated = await ProductsService.update(id, update);

    if (updated.acknowledged) {
      res
        .status(200)
        .json({ status: 'Product updated successfully!', update: product });
      return product;
    }
  };

  //* DELETE
  deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    const id = { id: pid };
    await this.manager.getFound(id);

    const deleted = await ProductsService.delete(id);
    return res.status(200).json(deleted);
  };

  //* SOCKET
}

module.exports = new ProductsController();
