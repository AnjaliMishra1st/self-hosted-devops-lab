import React from "react";
import Layout from "./Layout";

function Labs() {
  return (
    <Layout>
      <h2>🧪 DevOps Labs</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {/* DOCKER LAB */}
        <div style={card}>
          <h4>🐳 Docker Lab</h4>
          <p>Learn Docker basics</p>

          <button
            style={btn}
            onClick={() => window.location.href = "/docker"}
          >
            Start Lab
          </button>
        </div>

        {/* KUBERNETES LAB */}
        <div style={card}>
          <h4>☸ Kubernetes Lab</h4>
          <p>Deploy pods & services</p>

          <button
            style={btn}
            onClick={() => window.location.href = "/k8s"}
          >
            Start Lab
          </button>
        </div>

        {/* CI/CD LAB */}
        <div style={card}>
          <h4>⚙ CI/CD Lab</h4>
          <p>GitHub Actions pipeline</p>

          <button
            style={btn}
            onClick={() => window.location.href = "/cicd"}
          >
            Start Lab
          </button>
        </div>
      </div>
    </Layout>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Labs;