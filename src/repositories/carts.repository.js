const { Cart } = require('../models/carts');
const BaseRepository = require('./base.repository');

class CartsRepository extends BaseRepository {
  constructor() {
    super(Cart);
  }
  findCartById = async (id, populateOptions = {}) => {
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
}
module.exports = CartsRepository;
