const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  corridorId: String,
  entryRate: Number,
  exitRate: Number,
  density: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', sensorSchema);