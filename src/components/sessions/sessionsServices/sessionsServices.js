class SessionsServices {
  getSession = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++;
        return res.sendSuccess(`The site has been visited ${req.session.counter} Times.`);
      } else {
        req.session.counter = 1;
        return res.sendSuccess('Welcome VF!');
      }
    } catch (error) {
      return res.sendServerError('Error getSession');
    }
  };
  deleteSession = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (!err) {
          return res.sendSuccess('Log out Ok!');
        } else {
          return res.sendServerError('Log out ERROR', err);
        }
      });
    } catch (error) {
      return res.sendServerError('Error deleteSession');
    }
  };
}
module.exports = new SessionsServices();
