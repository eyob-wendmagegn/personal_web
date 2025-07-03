const mongoose = require('mongoose');

const addProjectsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: false },
  link: { type: String, required: false },
  explanation: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('addprojects', addProjectsSchema);