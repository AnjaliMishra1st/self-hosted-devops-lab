import React from "react";

function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          textAlign: "center",
          marginTop: "60px"
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          🚀 DevOpsVerse
        </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "700px",
            margin: "0 auto",
            color: "#cbd5e1"
          }}
        >
          AI-Powered Self-Hosted DevOps Learning Platform for Students,
          Teachers, Universities, and DevOps Beginners.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            onClick={() => (window.location.href = "/login")}
            style={btnPrimary}
          >
            Get Started
          </button>

          <button
            onClick={() => (window.location.href = "/login")}
            style={btnSecondary}
          >
            Live Demo
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "80px"
        }}
      >
        <div style={card}>
          <h3>🧪 Interactive Labs</h3>
          <p>Practice Docker, Kubernetes, YAML, and CI/CD in-browser.</p>
        </div>

        <div style={card}>
          <h3>🤖 AI Assistant</h3>
          <p>Get instant DevOps explanations and troubleshooting help.</p>
        </div>

        <div style={card}>
          <h3>👩‍🏫 Teacher Dashboard</h3>
          <p>Monitor student progress and performance in real-time.</p>
        </div>

        <div style={card}>
          <h3>📊 Analytics</h3>
          <p>Track progress with beautiful dashboards and charts.</p>
        </div>

        <div style={card}>
          <h3>🔐 Role-Based Access</h3>
          <p>Separate student and teacher experiences securely.</p>
        </div>

        <div style={card}>
          <h3>☁ Cloud Ready</h3>
          <p>Deploy on Azure, AWS, Kubernetes, or Docker easily.</p>
        </div>
      </div>
    </div>
  );
}

const btnPrimary = {
  padding: "12px 24px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
  fontSize: "16px"
};

const btnSecondary = {
  padding: "12px 24px",
  background: "transparent",
  color: "white",
  border: "1px solid white",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
};

export default LandingPage;