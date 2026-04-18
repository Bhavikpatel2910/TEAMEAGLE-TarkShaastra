const SensorData = require('../models/SensorData');
const { computePressure } = require('../services/pressureService');

exports.addSensorData = async (req, res) => {
  const data = await SensorData.create(req.body);

  const pressure = computePressure(
    data.density,
    data.entryRate,
    data.exitRate
  );

  res.json({ data, pressure });
};