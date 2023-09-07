const BASE_URL = "http://localhost:3001/";

function addToCart(pid) {
  fetch(`${BASE_URL}api/carts/64f8fc4a9e0393e1eb3d72cf`, {
    method: "POST",
    body: JSON.stringify({ product: pid }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    res.ok ? alert("Product added to cart") : alert("Unable to add product!")
  })
  // co(pid);
}
