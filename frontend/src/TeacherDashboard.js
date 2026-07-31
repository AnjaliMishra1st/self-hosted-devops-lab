import React, { useEffect, useState } from "react";
import Layout from "./Layout";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/admin/student-progress")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <Layout>
      <h2>👩‍🏫 Teacher Dashboard</h2>
      <p style={{ color: "#64748b" }}>
        Monitor student progress across DevOps labs
      </p>

      <div style={card}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtd}>Student</th>
              <th style={thtd}>Lab</th>
              <th style={thtd}>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" style={emptyStyle}>
                  No student progress found
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index}>
                  <td style={thtd}>{student.username}</td>
                  <td style={thtd}>{student.lab_name}</td>
                  <td style={thtd}>
                    <span style={badge}>
                      {student.completed ? "✅ Completed" : "❌ Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginTop: "20px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const thtd = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left"
};

const badge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "14px"
};

const emptyStyle = {
  padding: "20px",
  textAlign: "center",
  color: "#64748b"
};

export default TeacherDashboard;