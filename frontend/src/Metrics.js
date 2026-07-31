import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Metrics() {
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
      .then((data) => setStats(data));
  }, []);

  const chartData = [
    { name: "Labs", value: stats.active_labs },
    { name: "Progress", value: stats.progress },
    { name: "AI", value: stats.ai_usage },
    { name: "YAML", value: stats.yaml_runs }
  ];

  return (
    <Layout>
      <h2>📊 Metrics Dashboard</h2>
      <p style={{ color: "#64748b" }}>
        Real-time analytics for your DevOps learning progress
      </p>

      <div style={grid}>
        <div style={card}>
          <h4>Completed Labs</h4>
          <h2>{stats.active_labs}</h2>
        </div>

        <div style={card}>
          <h4>Progress</h4>
          <h2>{stats.progress}%</h2>
        </div>

        <div style={card}>
          <h4>AI Usage</h4>
          <h2>{stats.ai_usage}</h2>
        </div>

        <div style={card}>
          <h4>YAML Runs</h4>
          <h2>{stats.yaml_runs}</h2>
        </div>
      </div>

      <div style={chartCard}>
        <h3>📈 Usage Analytics</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginTop: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const chartCard = {
  background: "white",
  marginTop: "30px",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

export default Metrics;