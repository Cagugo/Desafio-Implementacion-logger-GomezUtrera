const CustomRouter = require('../../routes/router');
const ticketsController = require('./ticketsController/ticketsController');
const { validateTicketId } = require('../../utils/routes/routerParams');

class Tickets extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('tid', validateTicketId);
    
    const basePath = '/api/tickets';
    
    this.get(`${basePath}/`, ['ADMIN'], ticketsController.getAllTickets);
    this.get(`${basePath}/:tid`, ['ADMIN'], ticketsController.getTicketById);
    this.post(`${basePath}/`, ['ADMIN'], ticketsController.addTicket);
    this.delete(`${basePath}/:tid`, ['ADMIN'], ticketsController.deleteTicket);
  }
}
module.exports = new Tickets();
