import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./HeroSection.css";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row hero-section">
          {/* Text Section */}
          <div className="col-lg-6 text-center text-lg-start pt-1 custome-text">
            <p className="text-uppercase text-muted small">
              Unlock Your Coding Potential
            </p>
            <h1 className="display-4 fw-bold text-primary mt-1">
              Unleash Your Coding Prowess
            </h1>
            <p className="lead text-muted" style={{paddingTop: "20px"}}>
              Discover the Ultimate Coding Contest Platform: Where Innovation
              Meets Competition
            </p>
            <Link className="btn hero-button btn-lg rounded-pill mt-3" to="/administration/dashboard">
              Join Now
            </Link>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              // src="https://via.placeholder.com/500x300"
              src="https://img.freepik.com/premium-vector/web-developer-working-computer-programming-coding_24911-10259.jpg"
              alt="Coding Contest"
              className="banner-images img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
