const CustomRouter = require('../../routes/router');
const usersController = require('./usersController/usersController');
const { validateUserId } = require('../../utils/routes/routerParams');

class UsersRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('uid', validateUserId);

    const basePath = '/api/session/useradmin';

    this.get(`${basePath}/`, ['ADMIN'], usersController.getUsers);
    this.post(`${basePath}/recovery`, ['PUBLIC'], usersController.recoveryUser);
    this.post(`${basePath}/register`, ['ADMIN'], usersController.addUser);
    this.get(`${basePath}/:uid`, ['ADMIN'], usersController.getUserById);
    this.put(`${basePath}/:uid`, ['ADMIN'], usersController.updateUser);
    this.delete(`${basePath}/:uid`, ['ADMIN'], usersController.deleteUser);
  }
}
module.exports = new UsersRoutes();
