const sessionsServices = require('../sessionsServices/sessionsServices');

class SessionsController {
  getSession = async (req, res) => {
    return await sessionsServices.getSession(req, res);
  };
  deleteSession = async (req, res) => {
    return await sessionsServices.deleteSession(req, res);
  };
}
module.exports = new SessionsController();
