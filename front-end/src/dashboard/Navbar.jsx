import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/dashboard">
            Codehut
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/lend">
                  Add a book
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link1 hover-button"
                  to="/"
                >
                  Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link1 hover-button"
                  to="/"
                >
                  Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/login">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/signup">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
