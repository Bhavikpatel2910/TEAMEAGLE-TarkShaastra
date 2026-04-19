<<<<<<< HEAD
const WEATHER_PENALTIES = {
  clear: 0,
  heat: 4,
  rain: 6,
  'light rain': 4,
  'heavy rain': 6,
};

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function getWeatherPenalty(weather) {
  if (typeof weather === 'number') {
    if (weather <= 0) return 0;
    if (weather <= 0.1) return 4;
    if (weather <= 0.2) return 6;
    return round(weather, 2);
  }

  const numeric = Number(weather);
  if (Number.isFinite(numeric)) {
    return getWeatherPenalty(numeric);
  }

  const key = String(weather || 'Clear').trim().toLowerCase();
  return WEATHER_PENALTIES[key] ?? 0;
}

function normalizePSIInput(input = {}) {
  const entryRate = toNumber(input.entryRate ?? input.entry_flow_rate_pax_per_min);
  const exitRate = toNumber(input.exitRate ?? input.exit_flow_rate_pax_per_min);
  const density = toNumber(input.density ?? input.queue_density_pax_per_m2);
  const width = Math.max(0.5, toNumber(input.width ?? input.corridor_width_m, 0.5));
  const vehicleCount = toNumber(input.vehicleCount ?? input.vehicle_count ?? input.vehicles);
  const transportArrivalBurst = toNumber(
    input.transportArrivalBurst ?? input.transport_arrival_burst ?? input.transportBurst ?? input.burst
  );
  const festivalPeak = toNumber(input.festivalPeak ?? input.festival_peak ?? input.festival);
  const weather = input.weather ?? input.weather_penalty ?? input.weatherPenalty ?? 'Clear';
  const weatherPenalty = getWeatherPenalty(weather);

  return {
    entryRate,
    exitRate,
    density,
    width,
    vehicleCount,
    transportArrivalBurst,
    festivalPeak,
    weather,
    weatherPenalty,
  };
}

function calculatePSI(input = {}) {
  const data = normalizePSIInput(input);
  const netInflow = Math.max(0, data.entryRate - data.exitRate);
  const effectiveWidth = Math.max(data.width, 0.5);

  const psi =
    (8.7 * data.density) *
    (0.42 * (netInflow / effectiveWidth)) *
    (1.9 * data.vehicleCount) *
    (10 * data.transportArrivalBurst) *
    (7 * data.festivalPeak) *
    (1 + data.weatherPenalty / 100);

  return round(Math.max(0, psi), 2);
}

function getRiskLevel(psi) {
  if (psi < 50) return 'LOW';
  if (psi < 120) return 'MODERATE';
  if (psi < 200) return 'HIGH';
  return 'CRITICAL';
}

function getAlertLevel(psi) {
  const riskLevel = getRiskLevel(psi);
  if (riskLevel === 'CRITICAL') return 'CRITICAL';
  if (riskLevel === 'HIGH') return 'WARNING';
  return null;
}

function getCrushWindow(psi) {
  let window;

  if (psi < 50) {
    window = 19 - (psi / 50) * 4;
  } else if (psi < 120) {
    window = 14 - ((psi - 50) / 70) * 4;
  } else if (psi < 200) {
    window = 9 - ((psi - 120) / 80) * 4;
  } else {
    window = 4 - (Math.min(psi - 200, 130) / 130) * 3;
  }

  return round(Math.max(1, Math.min(19, window)), 2);
}

function buildReason(input = {}, riskLevel = null) {
  const data = normalizePSIInput(input);
  const reasons = [];
  const netInflow = Math.max(0, data.entryRate - data.exitRate);

  if (data.density >= 4) {
    reasons.push(`High density (${data.density} pax/m2)`);
  }
  if (netInflow > 0) {
    reasons.push(`High inflow (${round(netInflow, 1)} pax/min net)`);
  }
  if (data.transportArrivalBurst > 0) {
    reasons.push(`Transport burst (${data.transportArrivalBurst})`);
  }
  if (data.festivalPeak > 0) {
    reasons.push(`Festival crowd (${data.festivalPeak})`);
  }
  if (data.weatherPenalty > 0) {
    reasons.push(`Adverse weather (${String(data.weather)})`);
  }
  if (data.vehicleCount > 0) {
    reasons.push(`Vehicle congestion (${data.vehicleCount})`);
  }

  if (!reasons.length) {
    reasons.push('Stable crowd conditions');
  }

  if (riskLevel === 'CRITICAL' && !reasons.some((reason) => reason.includes('High density'))) {
    reasons.unshift('Extremely unsafe pressure level');
  }

  return reasons.join(', ');
}

function buildPredictionResult(input = {}) {
  const pressureIndex = calculatePSI(input);
  const riskLevel = getRiskLevel(pressureIndex);

  return {
    pressure_index: pressureIndex,
    risk_level: riskLevel,
    predicted_crush_window_min: getCrushWindow(pressureIndex),
    reason: buildReason(input, riskLevel),
  };
}

module.exports = {
  buildPredictionResult,
  buildReason,
  calculatePSI,
  getAlertLevel,
  getCrushWindow,
  getRiskLevel,
  getWeatherPenalty,
  normalizePSIInput,
};
=======
exports.computePressure = (density, entryRate, exitRate) => {
  const flowImbalance = entryRate - exitRate;

  const pressure =
    0.5 * density +
    0.3 * flowImbalance +
    0.2 * Math.max(entryRate, 0);

  return Math.min(Math.max(pressure, 0), 100);
};
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
