import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaSignOutAlt,
  FaUserGraduate
} from "react-icons/fa";

function Layout({ children }) {
  // Logged-in user + role
  const user = localStorage.getItem("user") || "Guest";
  const role = localStorage.getItem("role") || "student";

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          padding: "20px"
        }}
      >
        <h3 style={{ marginBottom: "30px" }}>🚀 DevOpsVerse</h3>

        <Link to="/" style={linkStyle}>
          <p><FaChartBar /> Dashboard</p>
        </Link>

        {/* Student Only */}
        {role === "student" && (
          <>
            <Link to="/labs" style={linkStyle}>
              <p>🧪 Labs</p>
            </Link>

            <Link to="/ai" style={linkStyle}>
              <p><FaRobot /> AI Lab</p>
            </Link>

            <Link to="/yaml" style={linkStyle}>
              <p><FaFileAlt /> YAML Lab</p>
            </Link>
          </>
        )}

        {/* Common */}
        <Link to="/metrics" style={linkStyle}>
          <p><FaChartLine /> Metrics</p>
        </Link>

        {/* Teacher Only */}
        {role === "teacher" && (
          <Link to="/teacher" style={linkStyle}>
            <p><FaUserGraduate /> Teacher Dashboard</p>
          </Link>
        )}
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, background: "#f1f5f9" }}>
        {/* TOP NAVBAR */}
        <div
          style={{
            background: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h4>{role === "teacher" ? "Teacher Portal" : "Student Portal"}</h4>

          <div>
            👤 {user} ({role}) |{" "}
            <FaSignOutAlt
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "10px"
};

export default Layout;