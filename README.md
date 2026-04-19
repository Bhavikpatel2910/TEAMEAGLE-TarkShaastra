# 🎯 StampedeShield Prediction System - End-to-End Setup

**A complete, working prediction system with Frontend → Backend → AI integration**

## 📊 System Overview

This is a complete working system that connects three services:

```
🎨 Frontend (HTML/CSS/JS)  →  🔧 Backend (Node.js/Express)  →  🤖 AI API (Python/FastAPI)
     Port 5500                        Port 3000                      Port 5000
     predictor.html                   /api/predictions               /predict
```

**Flow:** User fills prediction form → Frontend sends data → Backend validates & calls AI API → AI predicts → Results displayed in real-time

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js** v16+ ([download](https://nodejs.org/))
- **Python** 3.8+ ([download](https://www.python.org/))

### Start All Services

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
bash start.sh
```

**Manually (recommended for first time):**

1. **Terminal 1 - AI API:**
   ```bash
   cd AI
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python -m uvicorn api:app --reload --port 5000
   ```

2. **Terminal 2 - Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Terminal 3 - Frontend:**
   ```bash
   cd frontend
   python -m http.server 5500
   ```

4. **Open Browser:**
   ```
   http://localhost:5500/predictor.html
   ```

## ✅ What You Get

### 📁 Files Created/Updated

**Frontend:**
- ✨ `frontend/predictor.html` - Beautiful, functional prediction form UI

**Backend:**
- ✨ `backend/src/services/aiService.js` - Service to call AI API
- 📝 `backend/src/controllers/predictionController.js` - Updated with AI integration
- 📝 `backend/src/routes/predictionRoutes.js` - Added POST endpoints
- 📝 `backend/package.json` - Added axios dependency
- 📝 `backend/.env` - Environment configuration

**Documentation:**
- 📖 `SETUP_GUIDE.md` - Complete detailed setup guide
- 🧪 `TESTING_GUIDE.md` - Comprehensive testing guide
- 📝 `start.sh` / `start.bat` - Quick start scripts

## 🎨 Frontend Features

✅ Modern, responsive UI with dark theme
✅ Form with all 8 required input fields
✅ Real-time form validation
✅ Beautiful loading spinner
✅ Risk level badges (HIGH/MEDIUM/LOW in color)
✅ Detailed result display
✅ Error handling with user-friendly messages
✅ Clear button to reset form
✅ Smooth animations and transitions

## 🔧 Backend Features

✅ Express server with CORS enabled
✅ axios integration to call AI API
✅ Input validation
✅ Error handling
✅ Response formatting
✅ Environment configuration
✅ Health check endpoint

## 🤖 AI API Features

✅ FastAPI server on port 5000
✅ `/predict` endpoint for predictions
✅ Pydantic validation
✅ Pre-trained ML model
✅ Returns structured prediction results
✅ Error handling

## 📡 API Endpoints

### Frontend → Backend
```
POST /api/predictions
Content-Type: application/json

Request:
{
  "entry_flow_rate_pax_per_min": 150,
  "exit_flow_rate_pax_per_min": 120,
  "queue_density_pax_per_m2": 4.5,
  "corridor_width_m": 8.5,
  "vehicle_count": 45,
  "transport_arrival_burst": 12,
  "weather": "Clear",
  "festival_peak": 0.8
}

Response:
{
  "success": true,
  "input": {...},
  "prediction": {
    "pressure_index": 68.5,
    "risk_level": "MEDIUM",
    "predicted_crush_window_min": 24.5,
    "reason": "..."
  },
  "timestamp": "2026-04-19T..."
}
```

### Backend → AI API
```
POST /predict
Content-Type: application/json

Request: (same as above)

Response:
{
  "pressure_index": 68.5,
  "risk_level": "MEDIUM",
  "predicted_crush_window_min": 24.5,
  "reason": "..."
}
```

## 🧪 Testing

### Test with curl
```bash
curl -X POST http://localhost:3000/api/predictions \
  -H "Content-Type: application/json" \
  -d '{
    "entry_flow_rate_pax_per_min": 150,
    "exit_flow_rate_pax_per_min": 120,
    "queue_density_pax_per_m2": 4.5,
    "corridor_width_m": 8.5,
    "vehicle_count": 45,
    "transport_arrival_burst": 12,
    "weather": "Clear",
    "festival_peak": 0.8
  }'
```

### Test in Browser
1. Open http://localhost:5500/predictor.html
2. Fill in sample data
3. Click "Get Prediction"
4. See results in real-time

### Detailed Testing Guide
See `TESTING_GUIDE.md` for comprehensive testing scenarios, debugging, and integration tests.

## 📁 Project Structure

```
TEAMEAGLE-TarkShaastra-main/
├── frontend/
│   ├── predictor.html          ✨ NEW - Prediction form UI
│   └── index.html              (existing dashboard)
├── backend/
│   ├── .env                    ✨ NEW - Config
│   ├── server.js
│   ├── package.json            📝 UPDATED - added axios
│   └── src/
│       ├── services/
│       │   ├── aiService.js    ✨ NEW - calls AI API
│       │   └── ...
│       ├── controllers/
│       │   └── predictionController.js  📝 UPDATED
│       └── routes/
│           └── predictionRoutes.js      📝 UPDATED
├── AI/
│   ├── api.py                  (existing FastAPI)
│   ├── requirements.txt
│   └── ...
├── SETUP_GUIDE.md              ✨ NEW - Detailed guide
├── TESTING_GUIDE.md            ✨ NEW - Testing guide
├── start.sh                    ✨ NEW - Quick start (Linux/Mac)
└── start.bat                   ✨ NEW - Quick start (Windows)
```

## 🔧 Configuration

Edit `backend/.env`:
```bash
PORT=3000
AI_API_URL=http://localhost:5000
STORE_PREDICTIONS=false
```

## 🐛 Troubleshooting

### "Backend unreachable" error
```bash
# Check if backend is running
curl http://localhost:3000/
# If not, go to backend folder and run: npm start
```

### "AI API unreachable" error
```bash
# Check if AI API is running
curl http://localhost:5000/
# If not, go to AI folder and run: python -m uvicorn api:app --reload --port 5000
```

### CORS error in browser
- Verify backend is running (`npm start`)
- Check that frontend is calling `http://localhost:3000` (not `127.0.0.1`)
- Clear browser cache

### Timeout errors
- Make sure all 3 services are running
- Check network connectivity
- See detailed troubleshooting in `SETUP_GUIDE.md`

## 📖 Complete Guides

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step setup instructions with troubleshooting
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing guide with curl examples

## ✨ Features Implemented

- [x] Frontend form with all required fields
- [x] Frontend → Backend communication with fetch()
- [x] Backend → AI API communication with axios
- [x] CORS enabled for cross-origin requests
- [x] AI API `/predict` endpoint working
- [x] Error handling and validation
- [x] Real-time result display
- [x] Beautiful UI with risk level badges
- [x] Complete documentation and setup guides
- [x] Quick start scripts for all platforms

## 🚀 Next Steps

1. **Start the system** using the Quick Start instructions above
2. **Test with the browser** at http://localhost:5500/predictor.html
3. **Read SETUP_GUIDE.md** for detailed configuration options
4. **Read TESTING_GUIDE.md** for comprehensive testing scenarios
5. **Customize** as needed for your use case

## 📊 Example Test Cases

### High Risk Scenario
```json
{"entry_flow_rate_pax_per_min": 250, "exit_flow_rate_pax_per_min": 50, "queue_density_pax_per_m2": 9.5, "corridor_width_m": 5, "vehicle_count": 80, "transport_arrival_burst": 30, "weather": "Heat", "festival_peak": 1.0}
```
→ Expect: **HIGH** risk, pressure index > 80

### Medium Risk Scenario
```json
{"entry_flow_rate_pax_per_min": 150, "exit_flow_rate_pax_per_min": 120, "queue_density_pax_per_m2": 4.5, "corridor_width_m": 8.5, "vehicle_count": 45, "transport_arrival_burst": 12, "weather": "Clear", "festival_peak": 0.8}
```
→ Expect: **MEDIUM** risk, pressure index 50-80

### Low Risk Scenario
```json
{"entry_flow_rate_pax_per_min": 50, "exit_flow_rate_pax_per_min": 60, "queue_density_pax_per_m2": 1.5, "corridor_width_m": 12, "vehicle_count": 10, "transport_arrival_burst": 3, "weather": "Clear", "festival_peak": 0.2}
```
→ Expect: **LOW** risk, pressure index < 50

## 📞 Help & Support

- Check **SETUP_GUIDE.md** for detailed troubleshooting
- Check **TESTING_GUIDE.md** for testing and debugging
- Look at service logs in the terminal windows
- Check browser console (F12 → Console tab)

## ✅ Success Checklist

- [ ] All 3 services running (ports 5000, 3000, 5500)
- [ ] Frontend loads at http://localhost:5500/predictor.html
- [ ] Can fill prediction form
- [ ] Can submit and get results
- [ ] Results show risk level and metrics
- [ ] No console errors

---

**Happy predicting! 🎉**

Built with ❤️ for crowd safety intelligence
