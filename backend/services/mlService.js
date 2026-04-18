const axios = require("axios");

// 🔥 CHANGE THIS URL WHEN ML TEAM GIVES YOU API
const ML_API_URL = "http://localhost:8000/predict";

async function getPrediction(data) {
  try {
    const response = await axios.post(ML_API_URL, data);
    
    // Expected response from ML:
    // { "pressure": 33.85 }

    return response.data.pressure;
  } catch (error) {
    console.error("ML API Error:", error.message);
    throw new Error("ML model not responding");
  }
}

module.exports = { getPrediction };