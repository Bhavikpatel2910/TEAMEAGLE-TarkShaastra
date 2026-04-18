exports.computePressure = (density, entryRate, exitRate) => {
  const flowImbalance = entryRate - exitRate;

  const pressure =
    0.5 * density +
    0.3 * flowImbalance +
    0.2 * Math.max(entryRate, 0);

  return Math.min(Math.max(pressure, 0), 100);
};