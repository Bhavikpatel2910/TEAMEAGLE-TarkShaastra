const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getPrediction, createPrediction } = require('../controllers/predictionController');

// GET prediction by corridor ID (existing)
router.get('/:id', getPrediction);

// POST new prediction (calls AI API)
router.post('/predict', createPrediction);
// Also accept POST at root for flexibility
router.post('/', createPrediction);

=======
const { getPrediction } = require('../controllers/predictionController');

router.get('/:id', getPrediction);

>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
module.exports = router;