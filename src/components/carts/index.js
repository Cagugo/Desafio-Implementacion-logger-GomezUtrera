const CustomRouter = require('../../routes/router');
const cartsController = require('./cartsController/cartsController');
const { validateCartId, validateProductId } = require('../../utils/routes/routerParams');

class Carts extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('cid', validateCartId);
    this.router.param('pid', validateProductId);

    const basePath = '/api/carts';

    this.get(`${basePath}/`, ['ADMIN'], cartsController.getCarts);
    this.post(`${basePath}/`, ['ADMIN'], cartsController.addCart);
    this.get(`${basePath}/:cid`, ['ADMIN'], cartsController.getCartProductById);
    this.post(`${basePath}/:cid/product/:pid`, ['USER'], cartsController.addProductToCart);
    this.put(`${basePath}/:cid/product/:pid`, ['USER'], cartsController.updateProductQuantity);
    this.post(`${basePath}/:cid/purchase`, ['USER'], cartsController.purchaseCart);
    this.post(`${basePath}/:cid/purchasecart`, ['USER'], cartsController.purchaseCartMail);
    this.delete(`${basePath}/:cid`, ['ADMIN'], cartsController.deleteCart);
    this.delete(`${basePath}/:cid/product/:pid`, ['ADMIN'], cartsController.deleteProductFromCart);
    this.put(`${basePath}/:cid`, ['ADMIN'], cartsController.updateCart);
    this.delete(`${basePath}/:cid/products`, ['ADMIN'], cartsController.deleteAllProductsFromCart);
  }
}
module.exports = new Carts();
