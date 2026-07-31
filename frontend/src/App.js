import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Labs from "./Labs";
import DockerLab from "./DockerLab";
import K8sLab from "./K8sLab";
import AiLab from "./AiLab";
import CICDLab from "./CICDLab";
import YamlLab from "./YamlLab";
import Metrics from "./Metrics";
import TeacherDashboard from "./TeacherDashboard";
import ProtectedTeacherRoute from "./ProtectedTeacherRoute";

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* PROTECTED ROUTES */}
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/docker" element={<DockerLab />} />
            <Route path="/k8s" element={<K8sLab />} />
            <Route path="/ai" element={<AiLab />} />
            <Route path="/cicd" element={<CICDLab />} />
            <Route path="/yaml" element={<YamlLab />} />
            <Route path="/metrics" element={<Metrics />} />

            <Route
              path="/teacher"
              element={
                <ProtectedTeacherRoute>
                  <TeacherDashboard />
                </ProtectedTeacherRoute>
              }
            />
          </>
        )}

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
