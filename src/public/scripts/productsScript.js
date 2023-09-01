const socket = io('/products');

const productsSection = document.querySelector('.products');

socket.on('S-Get', (products) => {
  let output = '';
  products.forEach((product) => {
    output += `<div class='product'>
    <img src='${product.thumbnails}' alt='${product.title}' class='productImg' />
    <h3>${product.title}</h3>
    <h5>${product.category}</h5>
    <p>${product.description}</p>
    <strong>$${product.price}</strong>
  </div>`;
  });
  productsSection.innerHTML = output;
  // socket.emit('C-Add', product);
});
