const HandlebarsServices = require('../handlebarsServices/handlebarsServices');
const { usersServices } = require('../../../repositories/index');
const { getTotalProducts } = require('../handlebarsServices/handlebarsServices');

class HandlebarsController {
  getLogin = async (req, res) => {
    const data = await HandlebarsServices.getLogin(res);
    return res.render('login', data);
  };
  getRegister = async (req, res) => {
    const data = await HandlebarsServices.getRegister(res);
    return res.render('register', data);
  };
  getRecovery = async (req, res) => {
    const data = await HandlebarsServices.getRecovery(res);
    return res.render('recovery', data);
  };
  getUser = async (req, res) => {
    const data = await HandlebarsServices.getUser(res);
    const userData = req.session.user || req.user;
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const context = { user: userWithCurrentDTO, ...data };
    return res.render('profile', context);
  };
  getAdmin = async (req, res) => {
    const data = await HandlebarsServices.getAdmin(res);
    const userData = req.session.user || req.user;
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const context = { user: userWithCurrentDTO, ...data };
    return res.render('dashboard', context);
  };
  getCurrent = async (req, res) => {
    const data = await HandlebarsServices.getCurrent(res);
    const user = req.session.user || req.user;
    if (!user) {
      return res.sendServerError('Usuario no autorizado');
    }
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(user);
    const context = { user: userWithCurrentDTO, ...data };
    return res.render('current', context);
  };
  async getProducts(req, res) {
    const { limit, page, sort, query } = req.query;
    const userData = req.session.user || req.user;
    const data = await HandlebarsServices.getProducts(limit, page, sort, query, res, userData);
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const context = { user: userWithCurrentDTO, ...data };

    return res.render('products', context);
  }
  async getCartProductById(req, res) {
    const { cid } = req.params;
    const cartId = cid;
    const userData = req.session.user || req.user;
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const data = await HandlebarsServices.getCartProductById(cartId, res, userWithCurrentDTO);

    return res.render('carts', data);
  }
  async getRealTimeProducts(req, res) {
    const { limit, page, sort, query } = req.query;
    const userData = req.session.user || req.user;
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const data = await HandlebarsServices.getRealTimeProducts(limit, page, sort, query, res, userWithCurrentDTO);

    return res.render('realTimeProducts', data);
  }
  async getAdminProducts(req, res) {
    const { limit, page, sort, query } = req.query;
    const userData = req.session.user || req.user;
    const totalProducts = await getTotalProducts();
    const data = await HandlebarsServices.getAdminProducts(limit, page, sort, query, res, userData);
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const context = { user: userWithCurrentDTO, ...data, totalProducts };

    req.app.io.emit('totalProductsUpdate', totalProducts);
    return res.render('adminProducts', context);
  }
  async getHomeProducts(req, res) {
    const { limit, page, sort, query } = req.query;
    const userData = req.session.user || req.user;
    const userWithCurrentDTO = await usersServices.getUserWithCurrentDTO(userData);
    const data = await HandlebarsServices.getHomeProducts(limit, page, sort, query, res, userWithCurrentDTO);

    return res.render('home', data);
  }
  getChat = async (req, res) => {
    const data = await HandlebarsServices.getChat(res);
    return res.render('chat', data);
  };
}
module.exports = new HandlebarsController();
