import ProductManager from '../controllers/ProductManager.js';

const MyProducts = new ProductManager();

//* GET PRODUCTS
export async function getProducts(req, res) {
  try {
    const products = await MyProducts.getProducts();
    const { limit } = req.query;
    const id = parseInt(req.params.id);
    //* GET Limited products
    if (limit) {
      if (limit <= products.length) {
        const limitedProducts = products.filter((product, i) => {
          if (i <= limit - 1) {
            return product;
          }
        });
        await res.status(200).send(limitedProducts);
      } else {
        throw new Error(
          'El limite es mayor a la cantidad de productos existentes'
        );
      }
      //* GET Products by id
    } else if (id) {
      const product = await products.find((element) => element.id === id);
      if (product) {
        await res.status(200).send(product);
      } else {
        throw new Error('No se encontro un producto con ese id');
      }
      //* GET All products
    } else {
      await res.status(200).send(products);
    }
    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* ADD PRODUCT
export async function addProduct(req, res) {
  try {
    const products = await MyProducts.getProducts();
    const product = await req.body;
    const requiredFields = [
      'title',
      'description',
      'code',
      'price',
      'stock',
      'category',
    ];
    //* Validation
    for (const field of requiredFields) {
      if (!product[field]) {
        throw new Error('Por favor llena los campos obligatorios');
      }
    }
    //* ID and Status
    if (!products.length) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }
    product.status = !product.status && true;
    //* Check if duplicated
    const duplicated = products.find((add) => add.code === product.code);
    if (duplicated) {
      throw new Error('El código ya esta registrado');
    } else {
      await MyProducts.addProducts(product);
      await res.status(200).send({
        status: 'Success',
        message: 'El producto se agregó exitosamente',
      });
    }
    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* UPDATE PRODUCT
export async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.pid);
    const update = req.body;
    const response = await MyProducts.updateProducts(id, update);
    await res.status(200).send(response);
    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* DELETE PRODUCT
export async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.pid);
    await MyProducts.deleteProducts(id);
    await res
      .status(200)
      .send({ status: 'Success', message: 'Producto eliminado exitosamente' });
    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}
