const express = require("express");
const router = express.Router();

const { getPrediction } = require("../services/mlService");
const { getRisk } = require("../utils/risk");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // 🔥 Call ML model
    const pressure = await getPrediction(data);

    // 🔥 Calculate risk
    const risk = getRisk(pressure);

    res.json({
      pressure,
      risk,
      location: data.location,
      time: new Date()
    });

  } catch (error) {
    res.status(500).json({
      error: "Prediction failed",
      message: error.message
    });
  }
});

module.exports = router;