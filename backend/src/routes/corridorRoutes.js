const express = require('express');
const router = express.Router();
const { addSensorData } = require('../controllers/corridorController');

router.post('/sensor', addSensorData);

module.exports = router;