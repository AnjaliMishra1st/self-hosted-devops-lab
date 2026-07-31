import React, { useState } from "react";
import Layout from "./Layout";

function CICDLab() {
  const [yaml, setYaml] = useState("");
  const [output, setOutput] = useState("");

  const runPipeline = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/cicd-run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ yaml })
      });

      const data = await res.json();
      setOutput(data.output);

      // Save progress if successful
      if (data.output.includes("successfully")) {
        await fetch("http://127.0.0.1:5000/api/complete-lab", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: localStorage.getItem("user"),
            lab_name: "CI/CD Lab"
          })
        });
      }

    } catch (error) {
      setOutput("❌ Backend connection failed");
    }
  };

  return (
    <Layout>
      <h2>⚙ CI/CD Lab</h2>

      <textarea
        placeholder="Paste GitHub Actions / Pipeline YAML here..."
        value={yaml}
        onChange={(e) => setYaml(e.target.value)}
        style={{
          width: "100%",
          height: "180px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontFamily: "monospace"
        }}
      />

      <button
        onClick={runPipeline}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Run Pipeline
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "black",
          color: "lime",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "60px",
          fontFamily: "monospace"
        }}
      >
        {output || "💡 Pipeline output will appear here..."}
      </div>
    </Layout>
  );
}

export default CICDLab;