const CustomRouter = require('../../routes/router');
const loggerController = require('./loggerController/loggerController');

class Logger extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
   
    const basePath = '/loggertest';
    this.get(`${basePath}/`, ['ADMIN'], loggerController.getLogger);
  }
}
module.exports = new Logger();
