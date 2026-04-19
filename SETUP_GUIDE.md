# 🚀 Complete End-to-End System Setup Guide

This guide walks you through setting up and running the complete **Frontend → Backend → AI** prediction system.

## 📋 System Architecture

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
│   Frontend      │       │     Backend      │       │   AI Model      │
│  (Port 5500)    │──────▶│   (Port 3000)    │──────▶│   (Port 5000)   │
│  HTML/CSS/JS    │◀──────│  Express + CORS  │◀──────│ FastAPI Server  │
│ fetch() calls   │       │  axios calls     │       │  ML Prediction  │
└─────────────────┘       └──────────────────┘       └─────────────────┘
```

### Data Flow
1. **Frontend** → User fills form and clicks "Get Prediction"
2. **Frontend** → JavaScript fetch() sends JSON to Backend (`POST /api/predictions`)
3. **Backend** → Receives data, validates it, calls AI API with axios
4. **AI API** → FastAPI endpoint `/predict` processes data through ML model
5. **AI API** → Returns prediction (risk level, pressure index, crush window)
6. **Backend** → Returns AI result to Frontend
7. **Frontend** → Displays results in real-time with styling

---

## 🛠️ Prerequisites

Make sure you have installed:
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **Python** (v3.8+) - [Download](https://www.python.org/)
- **Git** (optional) - [Download](https://git-scm.com/)

Verify installations:
```bash
node --version
npm --version
python --version
pip --version
```

---

## 📦 Part 1: Setup AI Service (Python/FastAPI)

### 1.1 Navigate to AI folder
```bash
cd AI
```

### 1.2 Create a Python virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 1.3 Install dependencies
```bash
pip install -r requirements.txt
```

If you get an error, install manually:
```bash
pip install fastapi uvicorn pandas scikit-learn joblib pymongo python-multipart
```

### 1.4 Create .env file (optional for database logging)
```bash
# Copy from example if needed
cp .env.example .env
```

### 1.5 Run AI API server
```bash
python -m uvicorn api:app --reload --port 5000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:5000
INFO:     Application startup complete
```

✅ **AI API is running on PORT 5000**

### Test the AI API
Open another terminal:
```bash
curl -X POST http://localhost:5000/predict \
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

Expected response:
```json
{
  "pressure_index": 68.5,
  "risk_level": "MEDIUM",
  "predicted_crush_window_min": 24.5,
  "reason": "Moderate crowd density with stable flow rates"
}
```

---

## 📦 Part 2: Setup Backend (Node.js/Express)

### 2.1 In a new terminal, navigate to backend folder
```bash
cd backend
```

### 2.2 Install Node dependencies
```bash
npm install
```

This installs:
- `express` - Web framework
- `cors` - Enable cross-origin requests from frontend
- `axios` - Make HTTP calls to AI API
- `dotenv` - Load environment variables
- Other dependencies

### 2.3 Verify .env file
Check that `.env` exists in the backend folder with:
```
PORT=3000
AI_API_URL=http://localhost:5000
STORE_PREDICTIONS=false
```

If missing, create it:
```bash
echo "PORT=3000" > .env
echo "AI_API_URL=http://localhost:5000" >> .env
echo "STORE_PREDICTIONS=false" >> .env
```

### 2.4 Run the backend server
```bash
npm start
```

Or use nodemon for auto-reload:
```bash
npx nodemon server.js
```

You should see:
```
Server running on port 3000
```

✅ **Backend is running on PORT 3000**

### Test the backend
Open another terminal:
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

Expected response:
```json
{
  "success": true,
  "input": { /* your input data */ },
  "prediction": {
    "pressure_index": 68.5,
    "risk_level": "MEDIUM",
    "predicted_crush_window_min": 24.5,
    "reason": "Moderate crowd density..."
  },
  "timestamp": "2026-04-19T..."
}
```

---

## 🎨 Part 3: Frontend (HTML/CSS/JavaScript)

### 3.1 Open frontend in browser

#### Option A: Using Live Server (VS Code)
1. Open `frontend/predictor.html` in VS Code
2. Right-click → "Open with Live Server"
3. Browser opens at `http://localhost:5500`

#### Option B: Using Python's built-in server
```bash
cd frontend
python -m http.server 5500
```

#### Option C: Using Node's http-server
```bash
npm install -g http-server
cd frontend
http-server -p 5500
```

✅ **Frontend is running on PORT 5500**

---

## 🧪 Testing the Complete System

### Prerequisites
Make sure all three services are running:
- ✅ AI API: `http://localhost:5000`
- ✅ Backend: `http://localhost:3000`
- ✅ Frontend: `http://localhost:5500` (predictor.html)

### Test Flow

1. **Open browser** to `http://localhost:5500/predictor.html`

2. **Fill in the form** with sample data:
   - Entry Flow Rate: `150`
   - Exit Flow Rate: `120`
   - Queue Density: `4.5`
   - Corridor Width: `8.5`
   - Vehicle Count: `45`
   - Transport Arrival Burst: `12`
   - Weather: `Clear`
   - Festival Peak: `0.8`

3. **Click "Get Prediction"**

4. **Watch the flow**:
   - Frontend sends to Backend (`POST /api/predictions`)
   - Backend receives data, validates it
   - Backend calls AI API with axios
   - AI API processes and returns prediction
   - Backend passes result back to Frontend
   - Frontend displays results in real-time

5. **See results** in the Results card:
   - Risk Level (badge)
   - Pressure Index (PSI)
   - Crush Window (minutes)
   - Analysis reason

---

## 🔧 Troubleshooting

### Issue: "Backend unreachable" in browser console
**Solution:**
```bash
# Check if backend is running
curl http://localhost:3000/

# If not, start it:
cd backend
npm start
```

### Issue: "AI API unreachable"
**Solution:**
```bash
# Check if AI service is running
curl http://localhost:5000/

# If not, start it:
cd AI
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m uvicorn api:app --reload --port 5000
```

### Issue: "CORS error" in browser
**Solution:**
CORS is already enabled in the backend (`app.use(cors())`). If still getting errors:
1. Make sure frontend is calling `http://localhost:3000` (not `127.0.0.1`)
2. Make sure backend is running
3. Clear browser cache

### Issue: "Invalid JSON" error
**Solution:**
Make sure all form fields are filled before clicking "Get Prediction". The form requires:
- All numeric fields must have valid numbers
- Weather field must be selected

### Issue: "Timeout" error
**Solution:**
1. Make sure AI API is running and responding
2. Check network connectivity between backend and AI API
3. Increase timeout: Edit `backend/src/services/aiService.js`, change `timeout: 10000` to higher value

### Issue: Module not found errors
**Solution:**
```bash
# For backend
cd backend
npm install

# For AI
cd AI
pip install -r requirements.txt
```

---

## 📡 API Endpoints Reference

### Frontend Endpoints (called by user)
| Method | URL | Purpose |
|--------|-----|---------|
| GET | `http://localhost:5500/predictor.html` | Load prediction UI |

### Backend Endpoints (called by frontend)
| Method | URL | Body | Response |
|--------|-----|------|----------|
| GET | `http://localhost:3000/api/predictions/:id` | - | Get historical prediction |
| POST | `http://localhost:3000/api/predictions` | Prediction input JSON | Prediction result |
| POST | `http://localhost:3000/api/predictions/predict` | Prediction input JSON | Prediction result |

### AI API Endpoints (called by backend)
| Method | URL | Body | Response |
|--------|-----|------|----------|
| GET | `http://localhost:5000/` | - | Health check |
| POST | `http://localhost:5000/predict` | Prediction input JSON | Prediction result |

---

## 📊 Sample Request/Response

### Request (Frontend → Backend → AI)
```json
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
```

### Response (AI → Backend → Frontend)
```json
{
  "success": true,
  "input": { /* request data */ },
  "prediction": {
    "pressure_index": 68.5,
    "risk_level": "MEDIUM",
    "predicted_crush_window_min": 24.5,
    "reason": "Moderate crowd density with stable flow rates"
  },
  "timestamp": "2026-04-19T10:30:45.123Z"
}
```

---

## 📁 Project Structure

```
TEAMEAGLE-TarkShaastra-main/
├── frontend/
│   ├── index.html              # Main dashboard
│   ├── predictor.html          # 🆕 Simple prediction form UI
│   └── style.css              # Styles
├── backend/
│   ├── .env                    # 🆕 Environment variables
│   ├── server.js               # Entry point
│   ├── package.json            # Dependencies (added axios)
│   └── src/
│       ├── app.js              # Express app with CORS
│       ├── services/
│       │   ├── aiService.js    # 🆕 Calls AI API with axios
│       │   ├── predictionService.js
│       │   └── pressureService.js
│       ├── controllers/
│       │   └── predictionController.js  # 🆕 Updated to use AI
│       └── routes/
│           └── predictionRoutes.js      # 🆕 Added POST routes
└── AI/
    ├── .env.example            # Optional database config
    ├── api.py                  # FastAPI app
    ├── model.py                # ML model
    ├── requirements.txt        # Python dependencies
    └── model.pkl               # Trained ML model
```

---

## 🚀 Commands Quick Reference

### Start AI (Terminal 1)
```bash
cd AI
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m uvicorn api:app --reload --port 5000
```

### Start Backend (Terminal 2)
```bash
cd backend
npm install  # Only first time
npm start
```

### Start Frontend (Terminal 3)
```bash
cd frontend
python -m http.server 5500
```

### Or all in one (using GNU Make or bash)
```bash
# Start all services in background
(cd AI && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python -m uvicorn api:app --reload --port 5000) &
(cd backend && npm install && npm start) &
(cd frontend && python -m http.server 5500) &
```

---

## ✅ Success Checklist

- [ ] Python virtual environment created and activated
- [ ] AI dependencies installed (`pip install -r requirements.txt`)
- [ ] AI API running on port 5000 (check: `curl http://localhost:5000/`)
- [ ] Node dependencies installed (`npm install`)
- [ ] Backend .env file configured
- [ ] Backend running on port 3000 (check: `curl http://localhost:3000/`)
- [ ] Frontend accessible at `http://localhost:5500/predictor.html`
- [ ] Can fill form and submit without JavaScript errors
- [ ] Backend successfully calls AI API
- [ ] Prediction results display in Frontend UI
- [ ] Risk level badge shows correctly (HIGH/MEDIUM/LOW)
- [ ] Can clear form and submit multiple predictions

---

## 🎯 Next Steps (Optional Enhancements)

1. **Database Integration**: Uncomment `MONGO_URI` in `.env` to store predictions
2. **Authentication**: Add JWT validation in backend routes
3. **Real-time Updates**: Add WebSocket support for live predictions
4. **Caching**: Cache predictions to reduce AI API calls
5. **Rate Limiting**: Add rate limiting to prevent API abuse
6. **Monitoring**: Add logging and error tracking (e.g., Sentry)
7. **Docker**: Containerize all services for easier deployment

---

## 📞 Support

If you encounter issues:
1. Check the **Troubleshooting** section above
2. Verify all three services are running
3. Check console logs in browser (F12 → Console)
4. Check terminal logs where services are running
5. Ensure ports 3000, 5000, and 5500 are not in use

---

**Happy predicting! 🎉**
