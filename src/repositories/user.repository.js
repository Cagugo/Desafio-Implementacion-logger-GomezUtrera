const { User } = require('../models/users');
const UserDTO = require('../dao/DTOs/user.dto');
const BaseRepository = require('./base.repository');
const CurrentDTO = require('../dao/DTOs/current.dto');

class UsersRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  findUserById = async (id, populateOptions = {}) => {
    try {
      const item = await this.model.findById(id).populate(populateOptions).exec();
      if (!item) {
        return null;
      }
      return item;
    } catch (error) {
      throw error;
    }
  };
  createUserDTO = async (user) => {
    try {
      const userDTO = new UserDTO(user);
      const newUser = new User(userDTO);
      const savedUser = await newUser.save();

      return savedUser;
    } catch (error) {
      throw error;
    }
  };
  getUserWithCurrentDTO = async (user) => {
    try {
      const currentDTO = new CurrentDTO(user);
      return currentDTO;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = UsersRepository;
