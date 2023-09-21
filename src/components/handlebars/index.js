const CustomRouter = require('../../routes/router');
const handlebarsController = require('./handlebarsController/handlebarsController');
const { validateCartId } = require('../../utils/routes/routerParams');

class HandlebarsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('cid', validateCartId);
    this.get('/', ['PUBLIC'], handlebarsController.getLogin);
    this.get('/register', ['PUBLIC'], handlebarsController.getRegister);
    this.get('/recovery', ['PUBLIC'], handlebarsController.getRecovery);
    this.get('/products', ['USER'], handlebarsController.getProducts);
    this.get('/carts/:cid', ['USER'], handlebarsController.getCartProductById);
    this.get('/user', ['USER'], handlebarsController.getUser);
    this.get('/chat', ['USER'], handlebarsController.getChat);
    this.get('/admin', ['ADMIN'], handlebarsController.getAdmin);
    this.get('/admin/products', ['ADMIN'], handlebarsController.getAdminProducts);
    this.get('/realtimeproducts', ['ADMIN'], handlebarsController.getRealTimeProducts);
    this.get('/home', ['ADMIN'], handlebarsController.getHomeProducts);
    this.get('/current', ['USER', 'ADMIN'], handlebarsController.getCurrent);
  }
}
module.exports = new HandlebarsRoutes();
