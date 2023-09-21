const CustomRouter = require('../../routes/router');
const mockingController = require('./mockingController/mockingController');

class Mocking extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/mockingproducts';
    this.post(`${basePath}/`, ['ADMIN'], mockingController.addMocking);
  }
}
module.exports = new Mocking();
