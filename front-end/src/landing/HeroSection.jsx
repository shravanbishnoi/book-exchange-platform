import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './HeroSection.css';
import Navbar from './Navbar';

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
              Share Stories, Make Connections
            </p>
            <h1 className="display-4 fw-bold text-primary mt-1">
              Join the Book Exchange Revolution
            </h1>
            <p className="lead text-muted" style={{paddingTop: '20px'}}>
              Discover new reads, share your favorite books, and meet readers who share your passion.
            </p>
            <Link
              className="btn hero-button btn-lg rounded-pill mt-3"
              to="/dashboard"
            >
              Get Started
            </Link>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              src="https://img.freepik.com/free-photo/excited-teen-girl-showing-tablet-boyfriend_23-2147860637.jpg?t=st=1733553956~exp=1733557556~hmac=92e3f3de60be3a160bcf2456d2cdeef5c207d9aab5a60b13cc5b598b8c130bf7&w=1380"
              alt="Book Exchange Hero"
              className="banner-images img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
