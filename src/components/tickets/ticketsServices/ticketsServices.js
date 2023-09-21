const { Ticket } = require('../../../models/tickets');
const { ticketsServices } = require('../../../repositories/index');

class TicketsServices {
  getAllTickets = async (res) => {
    try {
      const tickets = await ticketsServices.findAll();
      const data = tickets;
      return res.sendSuccess(data);
    } catch (error) {
      return res.sendServerError('Error getting tickets');
    }
  };
  getTicketById = async (tid, res) => {
    try {
      const ticket = await ticketsServices.findById(tid);
      if (!ticket) {
        return res.sendNotFound('Ticket not found');
      } else {
        const data = ticket;
        return res.sendSuccess(data);
      }
    } catch (error) {
      return res.sendServerError('Error getting tickets');
    }
  };
  addTicket = async (payload, res) => {
    try {
      const { code, purchase_datetime, amount, purchaser } = payload;
      const newTicket = new Ticket({
        code,
        purchase_datetime,
        amount,
        purchaser,
      });
      await ticketsServices.create(newTicket);
      const data = newTicket;
      return res.sendSuccess({ message: 'Ticket added successfully', payload: data });
    } catch (error) {
      return res.sendServerError('Error adding ticket');
    }
  };
  deleteTicket = async (tid, res) => {
    try {
      const deletedTicket = await ticketsServices.findByIdAndDelete(tid);
      if (!deletedTicket) {
        return res.sendNotFound('Ticket not found');
      } else {
        const data = deletedTicket;
        return res.sendSuccess({ message: 'Ticket deleted successfully', payload: data });
      }
    } catch (error) {
      return res.sendServerError('Error deleting ticket');
    }
  };
}
module.exports = new TicketsServices();
