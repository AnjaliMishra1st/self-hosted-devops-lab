import React, { useEffect, useState } from "react";
import Layout from "./Layout";

function Dashboard() {
  const [stats, setStats] = useState({
    active_labs: 0,
    progress: 0,
    ai_usage: 0,
    yaml_runs: 0
  });

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/dashboard-stats?username=${localStorage.getItem("user")}`
    )
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log("Failed to fetch stats", err));
  }, []);

  return (
    <Layout>
      <h2>👋 Welcome back, {localStorage.getItem("user")}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <div style={cardStyle("#3b82f6")}>
          <h4>🚀 Active Labs</h4>
          <h2>{stats.active_labs}</h2>
        </div>

        <div style={cardStyle("#10b981")}>
          <h4>📊 Progress</h4>
          <h2>{stats.progress}%</h2>
        </div>

        <div style={cardStyle("#f59e0b")}>
          <h4>🤖 AI Usage</h4>
          <h2>{stats.ai_usage}</h2>
        </div>

        <div style={cardStyle("#ef4444")}>
          <h4>📁 YAML Runs</h4>
          <h2>{stats.yaml_runs}</h2>
        </div>
      </div>
    </Layout>
  );
}

const cardStyle = (color) => ({
  background: color,
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
});

export default Dashboard;