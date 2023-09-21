const CustomRouter = require('../../routes/router');
const productsController = require('./productsController/productsController');
const upload = require('../../utils/multer/multer');
const { validateProductId } = require('../../utils/routes/routerParams');

class ProductsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('pid', validateProductId);

    const basePath = '/api/products';
  
    this.post(`${basePath}/`, ['ADMIN'], upload.array('image', 5), productsController.addProduct);
    this.put(`${basePath}/:pid`, ['ADMIN'], upload.array('image', 5), productsController.updateProduct);
    this.delete(`${basePath}/:pid`, ['ADMIN'], productsController.deleteProduct);
    this.get(`${basePath}/`, ['ADMIN'], productsController.getAllProducts);
    this.get(`${basePath}/:pid`, ['ADMIN'], productsController.getProductById);
  }
}
module.exports = new ProductsRoutes();
