import fs from 'fs';

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = './src/database/Products.json';
  }

  //* GET
  async getProducts() {
    if (!fs.existsSync(this.path) || fs.readFileSync(this.path).length === 0) {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    return fileData;
  }

  //* ADD
  async addProducts(product) {
    if (fs.existsSync(this.path)) {
      const fileData = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      this.products = fileData;
    }
    this.products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }

  //* UPDATE
  async updateProducts(id, update) {
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    const product = await fileData.find((element) => element.id === id);
    if (product) {
      const res = {};
      for (const key of Object.keys(update)) {
        if (product[key] == update[key]) {
          if (!res.status) {
            res.status = 'Warning';
            res.message = `El campo '${key}' ya tenía ese valor, por lo que no fue actualizado`;
          } else {
            const message = res.message;
            res.message = `${message} 
            El campo '${key}' ya tenía ese valor, por lo que no fue actualizado
            `;
          }
        } else {
          product[key] = update[key];
          res.status = 'Success';
          res.message = `El producto fue actualizado con éxito`;
        }
      }
      await fs.promises.writeFile(this.path, JSON.stringify(fileData));
      return res;
    } else {
      throw new Error('No se ha encontrado ningún producto con ese id');
    }
  }

  //* DELETE
  async deleteProducts(id) {
    const fileData = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    const product = fileData.some((element) => element.id === id);
    if (product) {
      const newData = fileData.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newData));
    } else {
      throw new Error('No se ha encontrado ningún producto con ese id');
    }
  }
}
