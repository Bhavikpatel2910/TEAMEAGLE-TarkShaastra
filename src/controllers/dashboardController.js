const Corridor = require('../models/Corridor');
const Alert = require('../models/Alert');

exports.getDashboard = async (req, res) => {
  const corridors = await Corridor.find();
  const alerts = await Alert.find({ acknowledged: false });

  res.json({ corridors, alerts });
};