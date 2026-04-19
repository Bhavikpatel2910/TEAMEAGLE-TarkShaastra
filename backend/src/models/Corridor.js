const mongoose = require('mongoose');

const corridorSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true, trim: true, unique: true },
  width: { type: Number, required: true, min: 0.5 },
  length: { type: Number, default: 0, min: 0 },
  capacity: { type: Number, default: 0, min: 0 }
}, { timestamps: true, strict: false });

// Index for faster queries
corridorSchema.index({ name: 1 });
corridorSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Corridor', corridorSchema);
=======
  name: String,
  width: Number,
  capacity: Number
});

module.exports = mongoose.model('Corridor', corridorSchema);
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
