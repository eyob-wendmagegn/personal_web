const mongoose = require('mongoose');

const otherContentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('other', otherContentSchema);