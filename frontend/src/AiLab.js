import React, { useState } from "react";

function AiLab() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      const aiMessage = { role: "ai", text: data.answer };

      setChat([...chat, userMessage, aiMessage]);
      setQuestion("");

    } catch {
      setChat([
        ...chat,
        userMessage,
        { role: "ai", text: "❌ Error connecting to AI" }
      ]);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🤖 AI DevOps Assistant</h2>

      <div style={{ marginBottom: "20px" }}>
        {chat.map((msg, index) => (
          <div key={index} style={{
            margin: "10px 0",
            textAlign: msg.role === "user" ? "right" : "left"
          }}>
            <span style={{
              background: msg.role === "user" ? "#3b82f6" : "#e5e7eb",
              color: msg.role === "user" ? "white" : "black",
              padding: "10px",
              borderRadius: "10px",
              display: "inline-block",
              maxWidth: "70%"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask a DevOps question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={askAI} style={{ marginTop: "10px" }}>
        Ask AI
      </button>
    </div>
  );
}

export default AiLab;