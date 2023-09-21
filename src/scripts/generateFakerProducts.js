const faker = require('faker');
const { Product } = require('../models/products');
const { productsServices } = require('../repositories/index');
const req = require('../utils/logger/loggerSetup');
const NUM_FAKE_PRODUCTS = 20;

async function generateFakeProducts() {
  try {
    const existingProductsCount = await productsServices.countDocuments();

    if (existingProductsCount === 0) {
      for (let i = 0; i < NUM_FAKE_PRODUCTS; i++) {
        const fakeProduct = new Product({
          title: faker.commerce.productName(),
          description: limitDescriptionToFiveWords(faker.lorem.sentence()),
          code: faker.random.alphaNumeric(6),
          price: faker.datatype.number({ min: 1, max: 1000, precision: 0.01 }),
          stock: faker.datatype.number({ min: 0, max: 100 }),
          category: faker.commerce.department(),
        });
        await productsServices.save(fakeProduct);
      }
      req.logger.info('Product creation using Faker');
    } else {
      req.logger.warn('The product already exists on the DB. Product was not created through faker');
    }
  } catch (error) {
    console.error('Error creating fake products:', error);
  }
}
function limitDescriptionToFiveWords(description) {
  const words = description.split(' ');
  return words.slice(0, 5).join(' ');
}
module.exports.generateFakeProducts = generateFakeProducts;
