<<<<<<< HEAD
const mongoose = require('mongoose');
const Alert = require('../models/Alert');
const Corridor = require('../models/Corridor');
const SensorData = require('../models/SensorData');
const { calculatePSI, getRiskLevel } = require('../services/pressureService');
const {
  listAlerts: listMemoryAlerts,
  listCorridors: listMemoryCorridors,
} = require('../utils/runtimeStore');

function buildCorridorSnapshot(corridor, sensor = null) {
  const cpi = sensor
    ? (typeof sensor.cpi === 'number' ? sensor.cpi : calculatePSI({ ...sensor, width: corridor.width }))
    : null;

  return {
    ...corridor,
    id: String(corridor.id || corridor._id),
    entryRate: sensor?.entryRate ?? null,
    exitRate: sensor?.exitRate ?? null,
    density: sensor?.density ?? null,
    vehicleCount: sensor?.vehicleCount ?? null,
    transportBurst: sensor?.transportArrivalBurst ?? sensor?.transportBurst ?? null,
    festivalPeak: sensor?.festivalPeak ?? sensor?.festival ?? null,
    cpi,
    pressure_index: cpi,
    risk_level: cpi === null ? 'LOW' : getRiskLevel(cpi),
    updatedAt: sensor?.timestamp || corridor.updatedAt || corridor.createdAt || null,
  };
}

exports.getDashboard = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        corridors: listMemoryCorridors(),
        alerts: listMemoryAlerts().filter((alert) => !alert.acknowledged),
      });
    }

    const [corridors, alerts, sensorRows] = await Promise.all([
      Corridor.find().sort({ createdAt: -1 }).lean(),
      Alert.find({ acknowledged: false }).sort({ createdAt: -1 }).lean(),
      SensorData.find().sort({ timestamp: -1 }).lean(),
    ]);

    const latestByCorridor = new Map();
    for (const row of sensorRows) {
      const corridorId = String(row.corridorId || '');
      if (corridorId && !latestByCorridor.has(corridorId)) {
        latestByCorridor.set(corridorId, row);
      }
    }

    res.json({
      corridors: corridors.map((corridor) =>
        buildCorridorSnapshot(corridor, latestByCorridor.get(String(corridor._id)))
      ),
      alerts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard', details: error.message });
  }
};
=======
const Corridor = require('../models/Corridor');
const Alert = require('../models/Alert');

exports.getDashboard = async (req, res) => {
  const corridors = await Corridor.find();
  const alerts = await Alert.find({ acknowledged: false });

  res.json({ corridors, alerts });
};
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
