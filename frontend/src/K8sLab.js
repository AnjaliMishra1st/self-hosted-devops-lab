import React, { useState } from "react";
import Layout from "./Layout";

function K8sLab() {
  const [yaml, setYaml] = useState("");
  const [output, setOutput] = useState("");

  const runYaml = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/k8s-run", {
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
            lab_name: "Kubernetes Lab"
          })
        });
      }

    } catch (error) {
      setOutput("❌ Backend connection failed");
    }
  };

  return (
    <Layout>
      <h2>☸ Kubernetes Lab</h2>

      <textarea
        placeholder="Paste Kubernetes YAML here..."
        value={yaml}
        onChange={(e) => setYaml(e.target.value)}
        style={{
          width: "100%",
          height: "180px",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontFamily: "monospace"
        }}
      />

      <button
        onClick={runYaml}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          background: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Run YAML
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
        {output || "💡 Output will appear here..."}
      </div>
    </Layout>
  );
}

export default K8sLab;