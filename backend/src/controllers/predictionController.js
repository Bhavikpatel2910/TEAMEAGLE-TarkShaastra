const SensorData = require('../models/SensorData');
const { predictRisk } = require('../services/predictionService');

exports.getPrediction = async (req, res) => {
  const history = await SensorData.find({ corridorId: req.params.id })
    .sort({ timestamp: -1 })
    .limit(10);

  const values = history.map(h => h.density);

  const prediction = predictRisk(values);

  res.json(prediction);
};