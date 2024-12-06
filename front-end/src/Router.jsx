import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/Main";
import ProtectedRoute from "./utilities/ProtectedRoutes";
import Dashboard from "./dashboard/Dashboard";
import BookListingPage from "./dashboard/Books";
import ProfilePage from "./profile/ProfilePage";
import Contact from "./support/Contact";
import Login from "./Login";
import Signup from "./Signup";

const ApplicationRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
          <Route path="/support" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<BookListingPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default ApplicationRouter;
