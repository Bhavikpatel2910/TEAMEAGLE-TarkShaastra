const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
<<<<<<< HEAD
  corridorId: { type: String, index: true },
  level: String,
  message: String,
  acknowledged: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

// Composite index for common queries
alertSchema.index({ corridorId: 1, acknowledged: 1, createdAt: -1 });

=======
  corridorId: String,
  level: String,
  message: String,
  acknowledged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
module.exports = mongoose.model('Alert', alertSchema);