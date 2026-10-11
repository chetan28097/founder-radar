
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents import analyze_profiles
from crust_data import search_people

app = FastAPI(title="Founder Radar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchRequest(BaseModel):
    limit: int = 5


@app.get("/")
def home():
    return {"message": "Founder Radar API is running"}


@app.post("/api/search")
def search_founders(request: SearchRequest):
    try:
        data = search_people(limit=request.limit)
        profiles = data.get("profiles", [])

        if not profiles:
            return {"count": 0, "candidates": []}

        candidates = analyze_profiles(profiles)

        return {
            "count": len(candidates),
            "candidates": candidates
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )
