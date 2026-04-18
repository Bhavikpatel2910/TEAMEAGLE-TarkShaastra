function getRisk(pressure) {
  if (pressure >= 80) return { level: "CRITICAL", window: "8 min" };
  if (pressure >= 65) return { level: "HIGH", window: "10 min" };
  if (pressure >= 50) return { level: "MODERATE-HIGH", window: "12 min" };
  if (pressure >= 35) return { level: "MODERATE", window: "17 min" };
  return { level: "LOW", window: "19 min" };
}

module.exports = { getRisk };