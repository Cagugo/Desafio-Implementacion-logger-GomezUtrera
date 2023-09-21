const Dao = require('../dao/factory');

class BaseRepository {
  constructor(model) {
    this.model = model;
    this.Dao = new Dao(model);
  }
  create = async (data) => {
    try {
      const newItem = await this.Dao.create(data);
      return newItem;
    } catch (error) {
      throw error;
    }
  };
  findById = async (id) => {
    try {
      const item = await this.Dao.findById(id);
      if (!item) {
        return null;
      }
      return item;
    } catch (error) {
      throw error;
    }
  };
  findByIdAndUpdate = async (id, data) => {
    try {
      const updatedItem = await this.Dao.findByIdAndUpdate(id, data);
      if (!updatedItem) {
        return null;
      }
      return updatedItem;
    } catch (error) {
      throw error;
    }
  };
  findByIdAndDelete = async (id) => {
    try {
      const deletedItem = await this.Dao.findByIdAndDelete(id);
      if (!deletedItem) {
        return null;
      }
      return deletedItem;
    } catch (error) {
      throw error;
    }
  };
  findOne = async (query) => {
    try {
      const item = await this.Dao.findOne(query);
      return item;
    } catch (error) {
      throw error;
    }
  };
  findAll = async () => {
    try {
      const items = await this.Dao.findAll();
      return items;
    } catch (error) {
      throw error;
    }
  };
  save = async (data) => {
    try {
      const saveItem = await this.Dao.save(data);
      return saveItem;
    } catch (error) {
      throw error;
    }
  };
  countDocuments = async (query) => {
    try {
      const count = await this.Dao.countDocuments(query);
      return count;
    } catch (error) {
      throw error;
    }
  };
  async paginate(query = {}, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;
    const results = await this.model.find(query).skip(skip).limit(limit).exec();
    const totalDocs = await this.model.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return {
      docs: results,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: (page - 1) * limit + 1,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  }
  deleteOne = async (query) => {
    try {
      const deletedItem = await this.Dao.deleteOne(query);
      if (deletedItem.deletedCount === 0) {
        return null;
      }
      return deletedItem;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = BaseRepository;
