const express = require('express');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const cartsFilePath = './data/carrito.json';
const productsFilePath = './data/productos.json';

function generateCartId(carts) {
  let id;
  const existingIds = carts.map((cart) => cart.id);

  do {
    id = 'cid' + uuidv4().substring(0, 4);
  } while (existingIds.includes(id));

  return id;
}
(async () => {
  try {
    await fs.access(cartsFilePath);

    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    if (cartsData.trim() === '') {
      await fs.writeFile(cartsFilePath, '[]');
    }
  } catch (error) {
    await fs.writeFile(cartsFilePath, '[]');
  }
})();
router.post('/', async (req, res) => {
  try {
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    const carts = JSON.parse(cartsData);
    const newCartId = generateCartId(carts);
    const newCart = {
      id: newCartId,
      products: [],
    };
    carts.push(newCart);
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    return res.status(201).json({ status: 'created', message: 'New shopping cart created', cart: newCart });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error creating shopping cart' });
  }
});
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    const carts = JSON.parse(cartsData);
    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
      return res.status(404).json({ status: 'error', error: 'Cart not found' });
    }
    return res.status(200).json({ status: 'success', payload: cart.products });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error getting products from cart' });
  }
});
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    const carts = JSON.parse(cartsData);
    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Cart not found' });
    }
    const cart = carts[cartIndex];
    const productsData = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    const product = products.find((p) => p.id === pid);

    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Product ID not found. You must enter the ID of an existing product in the products.json file' });
    }
    const productIndex = cart.products.findIndex((p) => p.product === pid);

    if (productIndex === -1) {
      const newProduct = {
        product: pid,
        quantity: quantity || 1,
      };
      cart.products.push(newProduct);
    } else {
      cart.products[productIndex].quantity += quantity || 1;
    }
    carts[cartIndex] = cart;
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    return res.status(200).json({ status: 'success', message: 'Product added to cart successfully' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error adding product to cart' });
  }
});
router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    const carts = JSON.parse(cartsData);
    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Cart not found' });
    }
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex((p) => p.product === pid);

    if (productIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Product not found in Shopping cart' });
    }
    cart.products.splice(productIndex, 1);
    carts[cartIndex] = cart;
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    return res.status(200).json({ status: 'success', message: 'Product removed from cart successfully' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error removing product from cart' });
  }
});
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    const carts = JSON.parse(cartsData);
    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Cart not found' });
    }
    carts.splice(cartIndex, 1);
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    return res.status(200).json({ status: 'success', message: 'Cart deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error deleting Shopping cart' });
  }
});
module.exports = router;
