const CustomRouter = require('../../routes/router');
const authController = require('./authController/authController');

class Auth extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    
    const basePath = '/api/session/auth';
    this.router.use(basePath, (req, res, next) => {
      next();
    });
    this.post(`${basePath}/register`, ['PUBLIC'], authController.register);
    this.post(`${basePath}/login`, ['PUBLIC'], authController.login);
    this.get(`${basePath}/github`, ['PUBLIC'], authController.githubLogin);
    this.get(`${basePath}/githubcallback`, ['PUBLIC'], authController.githubCallback, authController.githubCallbackRedirect);
    this.get(`${basePath}/logout`, ['ADMIN', 'USER'], authController.logout);
  }
}
module.exports = new Auth();
