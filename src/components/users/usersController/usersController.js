const UsersServices = require('../usersServices/usersServices');

class UsersController {
  getUsers = async (req, res) => {
    return await UsersServices.getUsers(res);
  };
  addUser = async (req, res) => {
    const payload = req.body;
    return await UsersServices.addUser(payload, res);
  };
  recoveryUser = async (req, res) => {
    const { email, password } = req.body;
    return await UsersServices.recoveryUser({ email, password, res });
  };
  getUserById = async (req, res) => {
    const { uid } = req.params;
    return await UsersServices.getUserById(uid, res);
  };
  updateUser = async (req, res) => {
    const { uid } = req.params;
    const updateFields = req.body;
    return await UsersServices.updateUser(uid, updateFields, res, req);
  };
  deleteUser = async (req, res) => {
    const { uid } = req.params;
    return await UsersServices.deleteUser(uid, res, req);
  };
}
module.exports = new UsersController();
