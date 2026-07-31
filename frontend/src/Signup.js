import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setMessage("");

    if (!username || !password) {
      setMessage("Enter all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          role
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("✅ Signup successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setMessage("❌ Backend connection failed");
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={input}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button onClick={handleSignup} style={button}>
          Signup
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a"
};

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "320px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px"
};

const button = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  background: "#10b981",
  color: "white",
  border: "none"
};

export default Signup;