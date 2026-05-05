from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

# =========================
# APP INIT
# =========================
app = FastAPI(
    title="GenAI Tutor API",
    docs_url="/docs",        # Swagger UI
    redoc_url="/redoc"       # optional
)
# =========================
# CORS (VERY IMPORTANT)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend (React)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MEMORY STORAGE
# =========================
user_memory = {}

# =========================
# REQUEST MODEL
# =========================
class Model(BaseModel):
    user_id: str
    question: str

# =========================
# HEALTH CHECK
# =========================
@app.get("/")
def home():
    return {"message": "GenAI API running"}

# =========================
# HANDLE PREFLIGHT (CORS FIX)
# =========================
@app.options("/ask")
def options_handler():
    return Response(status_code=200)

@app.options("/stream")
def options_stream_handler():
    return Response(status_code=200)

# =========================
# NORMAL RESPONSE (OLD WAY)
# =========================
# @app.post("/ask")
# def ask_question(model: Model):
#     try:
#         # Step 1: create memory if not exists
#         if model.user_id not in user_memory:
#             user_memory[model.user_id] = []

#         # Step 2: add user message
#         user_memory[model.user_id].append(f"User: {model.question}")

#         # Step 3: build full prompt
#         full_prompt = "\n".join(user_memory[model.user_id])

#         # Step 4: call Ollama
#         response = requests.post(
#             "http://localhost:11434/api/generate",
#             json={
#                 "model": "llama3",
#                 "prompt": full_prompt,
#                 "stream": False
#             }
#         )

#         data = response.json()
#         answer = data.get("response", "No response")

#         # Step 5: store assistant reply
#         user_memory[model.user_id].append(f"Assistant: {answer}")

#         return {"ans": answer}

#     except Exception as e:
#         return {"error": str(e)}

@app.post("/ask")
def ask_question(model: Model):
    return {"ans": "Backend is live 🚀"}
# =========================
# STREAMING RESPONSE (NEW)
# =========================
# @app.post("/stream")
# def stream_answer(model: Model):

#     # Step 1: create memory
#     if model.user_id not in user_memory:
#         user_memory[model.user_id] = []

#     # Step 2: store user message
#     user_memory[model.user_id].append(f"User: {model.question}")

#     # Step 3: build prompt
#     full_prompt = "\n".join(user_memory[model.user_id])

#     # Step 4: generator function (VERY IMPORTANT)
#     def generate():

#         response = requests.post(
#             "http://localhost:11434/api/generate",
#             json={
#                 "model": "llama3",
#                 "prompt": full_prompt,
#                 "stream": True   # 🔥 ENABLE STREAMING
#             },
#             stream=True
#         )

#         full_answer = ""

#         # Step 5: read streaming chunks
#         for line in response.iter_lines():
#             if line:
#                 try:
#                     data = json.loads(line.decode("utf-8"))
#                     token = data.get("response", "")

#                     full_answer += token

#                     # 🔥 THIS SENDS DATA TO FRONTEND LIVE
#                     yield token

#                 except:
#                     continue

#         # Step 6: save final response
#         user_memory[model.user_id].append(f"Assistant: {full_answer}")

#     # Step 7: return streaming response
#     return StreamingResponse(generate(), media_type="text/plain")

@app.post("/stream")
def stream_answer(model: Model):

    def generate():
        text = "Backend streaming is live 🚀"

        for char in text:
            yield char

    return StreamingResponse(generate(), media_type="text/plain")


#df