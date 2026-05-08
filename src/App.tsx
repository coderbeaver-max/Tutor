import { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./App.css";

// =========================
// TYPES
// =========================
type Message = {
  role: "user" | "ai";
  text: string;
};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

function App() {

  // =========================
  // STATES
  // =========================
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  // =========================
  // SPEAK AI RESPONSE
  // =========================
  const speakText = (text: string) => {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // =========================
  // ASK AI
  // =========================
  const askAI = async () => {

    if (!question.trim()) return;

    // USER MESSAGE
    const userMessage: Message = {
      role: "user",
      text: question
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");

    try {

      setLoading(true);

      // =========================
      // API CALL
      // =========================
      const res = await axios.post(
        "https://backend-production-4b6a.up.railway.app/api/ask",
        {
          user_id: "buddy",
          question: currentQuestion,
          model: "gemini-2.5-flash"
        }
      );

      const aiText = res.data.response;

      // AI MESSAGE
      const aiMessage: Message = {
        role: "ai",
        text: aiText
      };

      setMessages((prev) => [...prev, aiMessage]);

      // =========================
      // AI SPEAKS RESPONSE
      // =========================
      speakText(aiText);

    } catch (error) {

      console.log(error);

      const errorMessage: Message = {
        role: "ai",
        text: "Error talking to AI"
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // START VOICE INPUT
  // =========================
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported");

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = () => {

      setListening(true);
    };

    recognition.onend = () => {

      setListening(false);
    };

    recognition.onresult = (event: any) => {

      const transcript =
        event.results[0][0].transcript;

      setQuestion(transcript);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  // =========================
  // ENTER KEY SUPPORT
  // =========================
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      askAI();
    }
  };

  // =========================
  // AUTO SCROLL
  // =========================
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (
    <div className="app">

      {/* ========================= */}
      {/* JARVIS ORB */}
      {/* ========================= */}
      <div className={loading ? "orb active" : "orb"} />

      <div className="container">

        <h1>JARVIS AI Tutor</h1>

        {/* ========================= */}
        {/* CHAT BOX */}
        {/* ========================= */}
        <div className="chat-box">

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "message user"
                    : "message ai"
                }
              >
                {msg.text}
              </div>
            ))
          }

          {
            loading && (
              <div className="message ai">
                Thinking...
              </div>
            )
          }

          <div ref={chatEndRef}></div>

        </div>

        {/* ========================= */}
        {/* INPUT AREA */}
        {/* ========================= */}
        <div className="input-area">

          <textarea
            placeholder="Ask Jarvis..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <div className="buttons">

            <button onClick={askAI}>
              Send
            </button>

            <button
              className={
                listening
                  ? "mic listening"
                  : "mic"
              }
              onClick={startListening}
            >
              🎤
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;