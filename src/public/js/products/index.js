let cartId;

document.addEventListener('DOMContentLoaded', function () {
  const cartIdElement = document.getElementById('cartId');
  cartId = cartIdElement.innerText;
});
async function addToCart(productId) {
  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    if (response.ok) {
      swal('Product added to Shopping cart', `Product ID: ${productId}\nCart ID: ${cartId}`, 'success');
      const totalProductosElement = document.getElementById('totalProductosCarrito');
      let totalProductos = parseInt(totalProductosElement.textContent);
      totalProductos++;
      totalProductosElement.textContent = totalProductos;
    } else {
      swal('Error adding product to cart', '', 'error');
    }
  } catch (error) {
    swal('Error adding product to cart', '', 'error');
  }
}
