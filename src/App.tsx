import { useState, useRef } from "react";

type Message = {
  role: string;
  text: string;
};

export default function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  // =========================
  // 🔥 USER ID
  // =========================
  const [userId] = useState(() => {
    const existing = localStorage.getItem("user_id");
    if (existing) return existing;

    const id = "user_" + Math.random().toString(36).substring(2, 9);
    localStorage.setItem("user_id", id);
    return id;
  });

  // =========================
  // 🔥 STREAMING FUNCTION (COMMON)
  // =========================
  const sendStreaming = async (inputText: string) => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "User", text: inputText }]);

    // Add empty assistant message
    setMessages(prev => [...prev, { role: "Assistant", text: "" }]);

    const res = await fetch("http://localhost:8000/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        question: inputText
      })
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    let result = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = result;
        return updated;
      });
    }

    // 🔊 SPEAK FULL RESPONSE
    const speech = new SpeechSynthesisUtterance(result);

    speech.onend = () => {
      // restart listening only if voice mode is ON
      if (isListening && recognitionRef.current) {
        recognitionRef.current.start();
      }
    };

    speechSynthesis.speak(speech);
  };

  // =========================
  // 🧠 CHAT SEND (DEBUG MODE)
  // =========================
  const sendChat = () => {
    sendStreaming(question);
    setQuestion("");
  };

  // =========================
  // 🎤 VOICE LOOP
  // =========================
  const startVoiceLoop = () => {
    const recognition = new (window as any).webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;

      recognition.stop(); // stop while processing

      sendStreaming(text);
    };

    recognition.onerror = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    setIsListening(true);

    recognition.start();
  };

  // =========================
  // 🛑 STOP VOICE LOOP
  // =========================
  const stopVoiceLoop = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
    speechSynthesis.cancel();
  };

  return (
    <div style={{ width: 500, margin: "auto", marginTop: 50 }}>
      <h2>🎤 Voice + Chat AI Tutor</h2>

      <div style={{
        border: "1px solid #ccc",
        height: 300,
        overflowY: "auto",
        padding: 10,
        background: "#fff"
      }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
      </div>

      {/* 🔥 CHAT INPUT (DEBUG / FALLBACK) */}
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type (debug mode)..."
        style={{ width: "60%", marginTop: 10 }}
      />

      <button onClick={sendChat}>Send</button>

      {/* 🔥 VOICE CONTROLS */}
      <div style={{ marginTop: 10 }}>
        <button onClick={startVoiceLoop}>▶ Start Voice</button>
        <button onClick={stopVoiceLoop}>⏹ Stop</button>
      </div>
    </div>
  );
}