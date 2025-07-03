const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['image', 'file'] },
  email: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  originalname: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('upload', uploadSchema);