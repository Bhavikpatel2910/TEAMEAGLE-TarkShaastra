const mongoose = require('mongoose');

const corridorSchema = new mongoose.Schema({
  name: String,
  width: Number,
  capacity: Number
});

module.exports = mongoose.model('Corridor', corridorSchema);