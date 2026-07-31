import React, { useState } from "react";
import Layout from "./Layout";

function DockerLab() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const runCommand = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/docker-run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ command })
      });

      const data = await res.json();

      // ✅ Always show output from backend
      setOutput(data.output);

      // ✅ Save progress if command worked (no error)
      if (data.output && !data.output.toLowerCase().includes("error")) {
        await fetch("http://127.0.0.1:5000/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: localStorage.getItem("user"),
            lab_name: "Docker Lab"
          })
        });
      }

    } catch (error) {
      setOutput("❌ Backend connection failed");
    }
  };

  return (
    <Layout>
      <h2>🐳 Docker Lab</h2>

      <input
        type="text"
        placeholder="Enter Docker command..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={runCommand}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Run
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "black",
          color: "lime",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "60px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap"
        }}
      >
        {output || "💡 Output will appear here..."}
      </div>
    </Layout>
  );
}

export default DockerLab;