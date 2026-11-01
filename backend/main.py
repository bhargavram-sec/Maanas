import os
import sys
from pathlib import Path

# Ensure project root is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from backend.models import (
    MentorAdviceRequest,
    MentorAdviceResponse,
    ChatRequest,
    ChatResponse
)
from backend.engine import MentorEngine
from backend.chat import MentorChatEngine

load_dotenv(".env.local")
load_dotenv(".env")

app = FastAPI(
    title="MANAS — Real Life & Relationship Mentor",
    description="Actionable AI mentorship for relationship problems, family enmeshment, career dilemmas, and social boundaries.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = MentorEngine()
chat_engine = MentorChatEngine()

# ---------------- API Endpoints ----------------
@app.get("/api/health")
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "MANAS Life Mentor API"}

@app.post("/api/mentor/advice", response_model=MentorAdviceResponse)
@app.post("/mentor/advice", response_model=MentorAdviceResponse)
async def get_mentor_advice(payload: MentorAdviceRequest):
    if not payload.situation.strip():
        raise HTTPException(status_code=400, detail="Situation details cannot be empty")
    return engine.analyze(payload.category, payload.situation)

# Compatibility route
@app.post("/api/analyze")
@app.post("/analyze")
async def compatibility_analyze(payload: dict):
    situation = payload.get("text") or payload.get("situation") or ""
    category = payload.get("category") or "dating"
    if not situation.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    advice = engine.analyze(category, situation)
    return {
        "type": advice.title,
        "conditioningType": advice.title,
        "confidence": 92,
        "origin": advice.root_diagnosis,
        "rewrite": advice.hard_truth,
        "healthyRewrite": advice.hard_truth,
        "practices": advice.immediate_action
    }

@app.post("/api/chat", response_model=ChatResponse)
@app.post("/chat", response_model=ChatResponse)
async def chat_message(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    history_items = [h.model_dump() for h in payload.history] if payload.history else None
    reply, session_id, engine_used = chat_engine.generate_response(
        message=payload.message,
        category=payload.category or "general",
        session_id=payload.session_id,
        incoming_history=history_items
    )
    return ChatResponse(
        reply=reply,
        session_id=session_id,
        engine_used=engine_used
    )

# ---------------- Static Frontend Serving ----------------
STATIC_DIR = PROJECT_ROOT / "static"

if STATIC_DIR.exists():
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 3000))
    print(f"Starting MANAS Mentor on http://localhost:{port}")
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
