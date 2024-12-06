import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/Main";
import ProtectedRoute from "./utilities/ProtectedRoutes";
import Dashboard from "./dashboard/Dashboard";

const ApplicationRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default ApplicationRouter;
