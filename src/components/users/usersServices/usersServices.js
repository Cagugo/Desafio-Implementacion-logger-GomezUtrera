const { User } = require('../../../models/users');
const { Cart } = require('../../../models/carts');
const { createHash } = require('../../../utils/bcrypt/bcrypt');
const { usersServices } = require('../../../repositories/index');
const { cartsServices } = require('../../../repositories/index');
const CustomError = require('../../../utils/errors/services/customError');
const EErrors = require('../../../utils/errors/services/enums');
const { generateUserErrorInfo } = require('../../../utils/errors/services/info');

class UsersServices {
  getUsers = async (res) => {
    try {
      const users = await usersServices.findAll();
      const data = users;
      return res.sendSuccess({ message: 'All users', payload: data });
    } catch (error) {
      return res.sendServerError('Error getting users');
    }
  };

  addUser = async (payload, res) => {
    try {
      const { first_name, last_name, age, email, password } = payload;
      if (!first_name || !last_name || !email) {
        console.log('Enter the group');
        try {
          CustomError.createError({
            name: 'User creation error',
            cause: generateUserErrorInfo({ first_name, last_name, age, email, password }),
            message: 'Error Trying to create User',
            code: EErrors.INVALID_TYPES_ERROR,
          });
        } catch (error) {
          console.error('An error occurred in CustomError:', error);
        }
        return res.sendServerError('User required fields missing');
      }
      const existingUser = await usersServices.findOne({ email: email });
      if (existingUser) {
        return res.sendUserError('A user with the same email already exists');
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
      });
      await usersServices.save(newUser);

      const userCart = new Cart({
        user: newUser._id,
        products: [],
      });
      await cartsServices.save(userCart);

      newUser.cart = userCart._id;

      const data = newUser;

      return res.sendCreated({ message: 'User successfully added', payload: data });
    } catch (error) {
      return res.sendServerError('Error adding user');
    }
  };
  recoveryUser = async ({ email, password, res }) => {
    try {
      let user = await usersServices.findOne({
        email: email,
      });
      if (!user) {
        return res.sendUnauthorized('The user does not exist in the database');
      }
      let data = await usersServices.findByIdAndUpdate(user._id, { password: createHash(password) }, { new: true });

      return res.sendSuccess({ message: 'Password updated successfully', payload: data });
    } catch (error) {
      return res.sendServerError('Error recovering password');
    }
  };
  getUserById = async (uid, res) => {
    try {
      const user = await usersServices.findById(uid);

      if (!user) {
        return res.sendNotFound('User not found');
      }
      const data = user;

      return res.sendSuccess({ message: 'Successfully obtained user', payload: data });
    } catch (error) {
      return res.sendServerError('Error getting user');
    }
  };
  updateUser = async (uid, updateFields, res, req) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email', 'age', 'password', 'role'];
      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));

      if (invalidFields.length > 0) {
        return res.sendUserError(`The following fields cannot be modified: ${invalidFields.join(', ')}`);
      }
      const updatedUser = await usersServices.findByIdAndUpdate(uid, updateFields, { new: true });
      if (!updatedUser) {
        return res.sendNotFound('User not found');
      }
      req.app.io.emit('updateUser', updatedUser);

      const data = updatedUser;
      return res.sendSuccess({ message: 'Successfully updated user', payload: data });
    } catch (error) {
      return res.sendServerError('Error updating user');
    }
  };
  deleteUser = async (uid, res, req) => {
    try {
      const deletedUser = await usersServices.findByIdAndDelete(uid);
      if (!deletedUser) {
        return res.sendNotFound('User not found');
      }
      req.app.io.emit('deleteUser', uid);
      const data = deletedUser;
      return res.sendSuccess({ message: 'Successfully deleted user', payload: data });
    } catch (error) {
      return res.sendServerError('Error deleting user');
    }
  };
}
module.exports = new UsersServices();
