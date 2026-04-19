@echo off
REM 🚀 Quick Start Script for StampedeShield Prediction System (Windows)
REM This script starts all three services in separate windows

setlocal enabledelayedexpansion

echo.
echo 🎯 Starting StampedeShield Prediction System...
echo.

REM Step 1: Start AI API
echo 🟡 Starting AI API on Port 5000...
start "AI API (Port 5000)" cmd /k "cd AI && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && python -m uvicorn api:app --reload --port 5000"
timeout /t 3 /nobreak

REM Step 2: Start Backend
echo 🟡 Starting Backend on Port 5001...
start "Backend (Port 5001)" cmd /k "cd backend && npm install && npm start"
timeout /t 3 /nobreak

REM Step 3: Start Frontend
echo 🟡 Starting Frontend on Port 5500...
start "Frontend (Port 5500)" cmd /k "cd frontend && python -m http.server 5500"
timeout /t 2 /nobreak

echo.
echo ════════════════════════════════════════
echo ✅ All services started successfully!
echo ════════════════════════════════════════
echo.
echo 📊 Service URLs:
echo   Frontend:  http://localhost:5500/index.html
echo   Backend:   http://localhost:5001
echo   AI API:    http://localhost:5000
echo.
echo ℹ️  New command windows have been opened for each service.
echo    Check each window for startup messages and errors.
echo.
pause
