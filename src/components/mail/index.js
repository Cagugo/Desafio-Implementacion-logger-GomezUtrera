const CustomRouter = require('../../routes/router');
const mailController = require('./maillController/mailController');

class mailRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {

    const basePath = '/mail';
    this.post(`${basePath}/`, ['ADMIN'], mailController.sendMail);
  }
}
module.exports = new mailRoutes();
