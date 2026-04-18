const Alert = require('../models/Alert');

exports.getAlerts = async (req, res) => {
  const alerts = await Alert.find();
  res.json(alerts);
};

exports.createAlert = async (req, res) => {
  const alert = await Alert.create(req.body);
  res.json(alert);
};

exports.acknowledgeAlert = async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { acknowledged: true },
    { new: true }
  );
  res.json(alert);
};