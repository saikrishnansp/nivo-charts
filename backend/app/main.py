# FastAPI backend that serves generated data
# simple english comments only
from fastapi import FastAPI, HTTPException
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
    try:
        print(f"[BACKEND] Generating chart: {chart_name}")
        data = generate_chart(chart_name)
        print(f"[BACKEND] Chart data generated successfully for {chart_name}")
        print(f"[BACKEND] Data keys: {data.keys() if isinstance(data, dict) else 'Not a dict'}")
        response = ChartResponse(chart=chart_name, data=data, timestamp=now_ts())
        print(f"[BACKEND] Response: {response.model_dump()}")
        return response
    except Exception as e:
        print(f"[BACKEND ERROR] Error generating chart {chart_name}: {e}")
        print(f"[BACKEND ERROR] Exception type: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Error generating chart: {str(e)}")

@app.get("/health")
def health():
    # simple health check
    return {"status": "ok"}
