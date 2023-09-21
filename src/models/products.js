const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] },
  },
  { timestamps: true, collection: 'products' }
);
productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);

module.exports = {
  Product,
};
