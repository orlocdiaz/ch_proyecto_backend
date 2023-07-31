import fs from 'fs';

export default class CartManager {
  constructor() {
    this.carts = [];
    this.path = './src/database/Cart.json';
    this.productsPath = './src/database/Products.json';
  }

  //* GET
  async getCarts() {
    if (!fs.existsSync(this.path) || fs.readFileSync(this.path).length === 0) {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    }
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    return fileData;
  }

  //* ADD CART
  async addCart(cart) {
    if (fs.existsSync(this.path)) {
      const fileData = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      this.carts = fileData;
    }
    this.carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
  }

  //* ADD CART PRODUCT
  async addCartProduct(cid, pid) {
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    const productsData = JSON.parse(
      await fs.promises.readFile(this.productsPath, 'utf-8')
    );

    const validateProduct = productsData.some((prod) => prod.id === pid);
    const cart = fileData.some((cart) => cart.id === cid);

    if (!validateProduct) {
      throw new Error('No existen productos con ese id');
    } else if (!cart) {
      throw new Error('No existen carritos con ese id');
    } else {
      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i].id === cid) {
          const cartProduct = fileData[i].products.some(
            (prod) => prod.product === pid
          );
          if (cartProduct) {
            fileData[i].products.forEach((prod) => {
              if (prod.product === pid) {
                prod.quantity = prod.quantity + 1;
              }
            });
            break;
          } else {
            const product = { product: pid, quantity: 1 };
            fileData[i].products.push(product);
            break;
          }
        }
      }

      await fs.promises.writeFile(this.path, JSON.stringify(fileData));
    }
  }
}
