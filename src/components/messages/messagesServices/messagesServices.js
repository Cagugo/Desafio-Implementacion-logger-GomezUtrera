const { Message } = require('../../../models/messages');
const { messagesServices } = require('../../../repositories/index');

class MessagesServices {
  addUserMessage = async (payload, res) => {
    try {
      const { user, message } = payload;
      const newMessage = new Message({
        user,
        message,
      });
      await messagesServices.save(newMessage);
      const data = newMessage;
      return res.sendSuccess({ message: 'Message added successfully', payload: data });
    } catch (error) {
      return res.sendServerError('Error adding message');
    }
  };
  getAllMessages = async (res) => {
    try {
      const messages = await messagesServices.findAll();
      const data = messages;
      return res.sendSuccess(data);
    } catch (error) {
      return res.sendServerError('Error getting message');
    }
  };
  deleteUserMessage = async (mid, res, req) => {
    try {
      const deletedMessage = await messagesServices.findByIdAndDelete(mid);

      if (!deletedMessage) {
        return res.sendNotFound('message not found');
      } else {
        const data = deletedMessage;
        return res.sendSuccess({ message: 'Message deleted successfully', payload: data });
      }
    } catch (error) {
      return res.sendServerError('Error deleting message');
    }
  };
}
module.exports = new MessagesServices();
