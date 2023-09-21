const CustomRouter = require('../../routes/router');
const sessionsController = require('./sessionsController/sessionsController');

class SessionsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    
    const basePath = '/api/session';

    this.get(`${basePath}/session`, ['ADMIN'], sessionsController.getSession);
    this.get(`${basePath}/deletesession`, ['ADMIN'], sessionsController.deleteSession);
  }
}
module.exports = new SessionsRoutes();
