# simple data models for responses
from typing import Any, Dict
from pydantic import BaseModel

class ChartResponse(BaseModel):
    chart: str
    data: Any
    timestamp: int
