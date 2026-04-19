const express = require('express');
<<<<<<< HEAD
=======
require('dotenv').config();
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const corridorRoutes = require('./routes/corridorRoutes');
const alertRoutes = require('./routes/alertRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

=======
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
app.use('/api/auth', authRoutes);
app.use('/api/corridors', corridorRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/dashboard', dashboardRoutes);

<<<<<<< HEAD
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled API error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

module.exports = app;
=======
module.exports = app;
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
