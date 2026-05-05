from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

# =========================
# APP INIT
# =========================
app = FastAPI(
    title="GenAI Tutor API",
    docs_url="/docs",
    redoc_url="/redoc"
)

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MEMORY
# =========================
user_memory = {}

# =========================
# MODEL
# =========================
class Model(BaseModel):
    user_id: str
    question: str

# =========================
# HEALTH CHECK (DO NOT USE "/" FOR UI)
# =========================
@app.get("/api")
def health():
    return {"message": "GenAI API running"}

# =========================
# CORS PREFLIGHT
# =========================
@app.options("/api/ask")
def options_handler():
    return Response(status_code=200)

@app.options("/api/stream")
def options_stream_handler():
    return Response(status_code=200)

# =========================
# NORMAL RESPONSE
# =========================
@app.post("/api/ask")
def ask_question(model: Model):
    return {"ans": "Backend is live 🚀"}

# =========================
# STREAMING RESPONSE
# =========================
@app.post("/api/stream")
def stream_answer(model: Model):

    def generate():
        text = "Backend streaming is live 🚀"
        for char in text:
            yield char

    return StreamingResponse(generate(), media_type="text/plain")