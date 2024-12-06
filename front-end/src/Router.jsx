import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/Main";
import ProtectedRoute from "./utilities/ProtectedRoutes";
import Dashboard from "./dashboard/Dashboard";
import BookListingPage from "./dashboard/Books";
import ProfilePageComponent from "./profile/ProfilePageComponent";
import ProfilePage from "./profile/ProfilePage";
import Contact from "./support/Contact";

const ApplicationRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/support" element={<Contact />}></Route>
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
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
