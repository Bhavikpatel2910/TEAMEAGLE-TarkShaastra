"""
MongoDB helper for saving prediction history.
"""

from __future__ import annotations

from datetime import datetime, timezone
import os
from typing import Any

from pymongo import MongoClient
from pymongo.errors import PyMongoError


MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("MONGO_DB", "stampede_window_predictor")
COLLECTION_NAME = "predictions"

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=1000)
db = client[DATABASE_NAME]
predictions = db[COLLECTION_NAME]


def save_prediction(input_data: dict[str, Any], output_data: dict[str, Any]) -> str | None:
    """Save prediction history without blocking the API if MongoDB is offline."""
    document = {
        "input": input_data,
        "output": output_data,
        "created_at": datetime.now(timezone.utc),
    }

    try:
        result = predictions.insert_one(document)
        return str(result.inserted_id)
    except PyMongoError:
        return None
