# FastAPI backend that serves generated data
# simple english comments only
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .data_generators import generate_chart, now_ts
from .models import ChartResponse

app = FastAPI()

# allow local dev from vite (default port 5173) and axios calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/charts/{chart_name}", response_model=ChartResponse)
def get_chart(chart_name: str):
    # return generated data with timestamp
    data = generate_chart(chart_name)
    return ChartResponse(chart=chart_name, data=data, timestamp=now_ts())

@app.get("/health")
def health():
    # simple health check
    return {"status": "ok"}
