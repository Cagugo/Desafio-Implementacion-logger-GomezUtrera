const { Schema, model } = require('mongoose');
const messageSchema = new Schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, collection: 'messages' }
);
messageSchema.index({ createdAt: -1 });

const Message = model('Message', messageSchema);

module.exports = {
  Message,
};
