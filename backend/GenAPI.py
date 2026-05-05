from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

# =========================
# APP INIT
# =========================
app = FastAPI(
    title="GenAI Tutor API",
    docs_url="/docs",        # Swagger
    redoc_url="/redoc"
)

# =========================
# CORS (Frontend access)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MEMORY (simple in-memory)
# =========================
user_memory = {}

# =========================
# MODEL
# =========================
class Model(BaseModel):
    user_id: str
    question: str

# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def root():
    return {"status": "Backend running 🚀"}

@app.get("/api/health")
def health():
    return {"message": "API healthy ✅"}

# =========================
# PREFLIGHT (CORS)
# =========================
@app.options("/api/ask")
def options_ask():
    return Response(status_code=200)

@app.options("/api/stream")
def options_stream():
    return Response(status_code=200)

# =========================
# CHAT (NON-STREAM)
# =========================
@app.post("/api/ask")
def ask_question(model: Model):
    try:
        if model.user_id not in user_memory:
            user_memory[model.user_id] = []

        user_memory[model.user_id].append(f"User: {model.question}")

        # TEMP RESPONSE
        answer = "Backend is live 🚀"

        user_memory[model.user_id].append(f"Assistant: {answer}")

        return {"ans": answer}

    except Exception as e:
        return {"error": str(e)}

# =========================
# STREAMING CHAT
# =========================
@app.post("/api/stream")
def stream_answer(model: Model):

    def generate():
        text = "Backend streaming is live 🚀"
        full = ""

        for char in text:
            full += char
            yield char

        # store after complete
        if model.user_id not in user_memory:
            user_memory[model.user_id] = []

        user_memory[model.user_id].append(f"User: {model.question}")
        user_memory[model.user_id].append(f"Assistant: {full}")

    return StreamingResponse(generate(), media_type="text/plain")