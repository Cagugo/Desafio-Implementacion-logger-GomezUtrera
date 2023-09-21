const { Product } = require('../models/products');
const BaseRepository = require('./base.repository');

class ProductsRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
}
module.exports = ProductsRepository;
