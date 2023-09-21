const CustomRouter = require('../../routes/router');
const messagesController = require('./messagesController/messagesController');
const { validateMessageId } = require('../../utils/routes/routerParams');

class Messages extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('mid', validateMessageId);

    const basePath = '/api/chat';

    this.post(`${basePath}/`, ['USER'], messagesController.addUserMessage);
    this.get(`${basePath}/`, ['ADMIN'], messagesController.getAllMessages);
    this.delete(`${basePath}/:mid`, ['ADMIN'], messagesController.deleteUserMessage);
  }
}
module.exports = new Messages();
