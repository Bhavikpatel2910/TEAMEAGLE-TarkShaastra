"""
FastAPI app for the Stampede Window Predictor.
Run from this folder with: python -m uvicorn api:app --reload
"""

from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from db import database_configured, save_prediction
from model import MODEL, get_prediction_result


app = FastAPI(
    title="Stampede Window Predictor",
    description="PSI-based crowd risk prediction with optional ML enhancement.",
    version="1.0.0",
)


class PredictionInput(BaseModel):
    entry_flow_rate_pax_per_min: float = Field(..., ge=0)
    exit_flow_rate_pax_per_min: float = Field(..., ge=0)
    queue_density_pax_per_m2: float = Field(..., ge=0)
    corridor_width_m: float = Field(..., ge=0)
    vehicle_count: float = Field(..., ge=0)
    transport_arrival_burst: float = Field(..., ge=0)
    weather: str = Field(..., examples=["Clear", "Heat", "Rain"])
    festival_peak: float = Field(..., ge=0)


class PredictionOutput(BaseModel):
    pressure_index: float
    risk_level: str
    predicted_crush_window_min: float
    reason: str


def _payload_to_dict(payload: PredictionInput) -> dict:
    """Support both Pydantic v1 and v2."""
    if hasattr(payload, "model_dump"):
        return payload.model_dump()
    return payload.dict()


@app.get("/")
def health_check() -> dict[str, str | bool]:
    return {
        "status": "ok",
        "service": "Stampede Window Predictor",
        "model_loaded": MODEL is not None,
        "database_configured": database_configured(),
    }


@app.post("/predict", response_model=PredictionOutput)
def predict(payload: PredictionInput) -> PredictionOutput:
    """Predict PSI risk and estimated crush window."""
    try:
        input_data = _payload_to_dict(payload)
        output_data = get_prediction_result(input_data)
        save_prediction(input_data, output_data)
        return PredictionOutput(**output_data)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}") from exc
