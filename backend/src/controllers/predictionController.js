const mongoose = require('mongoose');
const Corridor = require('../models/Corridor');
const SensorData = require('../models/SensorData');
const { callAIPrediction } = require('../services/aiService');
const { buildPredictionResult } = require('../services/pressureService');
const {
  getCorridor: getMemoryCorridor,
  listHistory: listMemoryHistory,
} = require('../utils/runtimeStore');

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

function normalizeHistoryInput(corridor, sensor) {
  return {
    entryRate: sensor.entryRate,
    exitRate: sensor.exitRate,
    density: sensor.density,
    width: corridor?.width ?? sensor.width ?? 0.5,
    vehicleCount: sensor.vehicleCount ?? 0,
    transportArrivalBurst: sensor.transportArrivalBurst ?? sensor.transportBurst ?? 0,
    weather: sensor.weather ?? sensor.weatherPenalty ?? 'Clear',
    festivalPeak: sensor.festivalPeak ?? sensor.festival ?? 0,
  };
}

function isValidPredictionShape(payload) {
  return payload &&
    typeof payload.pressure_index === 'number' &&
    typeof payload.predicted_crush_window_min === 'number' &&
    typeof payload.risk_level === 'string' &&
    typeof payload.reason === 'string';
}

exports.getPrediction = async (req, res) => {
  try {
    const corridorId = String(req.params.id || '').trim();
    if (!corridorId) {
      return res.status(400).json({ error: 'corridor id is required' });
    }

    if (!isDbConnected()) {
      const corridor = getMemoryCorridor(corridorId);
      const history = listMemoryHistory(corridorId, 10);
      const latest = history[history.length - 1];

      if (!latest) {
        return res.status(404).json({ error: 'No sensor history for this corridor' });
      }

      return res.json(buildPredictionResult(normalizeHistoryInput(corridor, latest)));
    }

    const [corridor, history] = await Promise.all([
      Corridor.findById(corridorId).lean(),
      SensorData.find({ corridorId }).sort({ timestamp: -1 }).limit(10).lean(),
    ]);

    if (!history.length) {
      return res.status(404).json({ error: 'No sensor history for this corridor' });
    }

    res.json(buildPredictionResult(normalizeHistoryInput(corridor, history[0])));
  } catch (error) {
    res.status(500).json({ error: 'Failed to get prediction', details: error.message });
  }
};

exports.createPrediction = async (req, res) => {
  try {
    const requiredFields = [
      'entry_flow_rate_pax_per_min',
      'exit_flow_rate_pax_per_min',
      'queue_density_pax_per_m2',
      'corridor_width_m',
      'vehicle_count',
      'transport_arrival_burst',
      'weather',
      'festival_peak',
    ];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    const localPrediction = buildPredictionResult(req.body);
    let prediction = localPrediction;
    let source = 'local_psi';

    try {
      const aiPrediction = await callAIPrediction(req.body);
      if (isValidPredictionShape(aiPrediction)) {
        prediction = aiPrediction;
        source = 'ai_service';
      }
    } catch (error) {
      console.warn('AI prediction fallback:', error.message);
    }

    if (process.env.STORE_PREDICTIONS === 'true' && isDbConnected()) {
      await SensorData.create({
        corridorId: String(req.body.corridor_id || 'prediction'),
        entryRate: Number(req.body.entry_flow_rate_pax_per_min),
        exitRate: Number(req.body.exit_flow_rate_pax_per_min),
        density: Number(req.body.queue_density_pax_per_m2),
        width: Number(req.body.corridor_width_m),
        vehicleCount: Number(req.body.vehicle_count),
        transportBurst: Number(req.body.transport_arrival_burst),
        transportArrivalBurst: Number(req.body.transport_arrival_burst),
        weather: req.body.weather,
        festival: Number(req.body.festival_peak),
        festivalPeak: Number(req.body.festival_peak),
        cpi: prediction.pressure_index,
        pressureIndex: prediction.pressure_index,
        riskLevel: prediction.risk_level,
        timestamp: new Date(),
      });
    }

    res.json({
      success: true,
      input: req.body,
      prediction,
      source,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({
      error: 'Prediction failed',
      details: error.message,
    });
  }
};
