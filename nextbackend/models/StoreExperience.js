const mongoose = require('mongoose');

const storeExperienceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('storeexperience', storeExperienceSchema);