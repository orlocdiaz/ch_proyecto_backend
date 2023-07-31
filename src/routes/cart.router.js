import CartManager from '../controllers/CartManager.js';

const MyCart = new CartManager();

//* GET CART
export async function getCart(req, res) {
  try {
    const id = parseInt(req.params.cid);
    const carts = await MyCart.getCarts();
    //* GET Cart by id
    if (id) {
      const cart = await carts.find((element) => element.id === id);
      if (cart) {
        await res.status(200).send(cart);
      } else {
        throw new Error('No se encontro un carrito con ese id');
      }
      //* Get All Carts
    } else {
      await res.status(200).send(carts);
    }
    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* ADD CART
export async function addCart(req, res) {
  try {
    const carts = await MyCart.getCarts();
    const cart = { products: [] };
    //* Generate id
    if (!carts.length) {
      cart.id = 1;
    } else {
      cart.id = carts[carts.length - 1].id + 1;
    }
    //* Send cart to db file
    await MyCart.addCart(cart);
    await res.status(200).send({
      status: 'Success',
      message: 'El carrito se agregó exitosamente',
    });

    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}

//* ADD CART PRODUCTS
export async function addCartProduct(req, res) {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    //* Send product to db file
    await MyCart.addCartProduct(cid, pid);
    await res.status(200).send({
      status: 'Success',
      message: `El producto se agregó exitosamente al carrito ${cid}`,
    });

    //* CATCH Errors
  } catch (error) {
    await res.status(404).send({ status: 'Fail', message: error.message });
  }
}
