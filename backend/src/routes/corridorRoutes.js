const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const corridorController = require('../controllers/corridorController');

router.get('/', corridorController.getCorridors);
router.post('/', corridorController.createCorridor);
router.post('/sensor', corridorController.ingestSensorData);
router.get('/:id/history', corridorController.getCorridorHistory);
router.get('/:id', corridorController.getCorridorById);

module.exports = router;
=======
const { addSensorData } = require('../controllers/corridorController');

router.post('/sensor', addSensorData);

module.exports = router;
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
