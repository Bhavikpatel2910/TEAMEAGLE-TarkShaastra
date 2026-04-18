const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  corridorId: String,
  level: String,
  message: String,
  acknowledged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);