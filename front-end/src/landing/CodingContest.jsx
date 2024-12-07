import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CodingContest.css';
import {Link} from 'react-router-dom';

const CodingContests = () => {
  return (
    <div className="container">
      <div className="row contest-container align-items-center">
        {/* Text Section */}
        <div className="col-lg-6 text-center text-lg-start">
          <p className="text-uppercase text-muted small">
            Connect Through Books
          </p>
          <h1 className="display-4 fw-bold text-primary">
            Join Book Exchange Events
          </h1>
          <p className="lead" style={{paddingTop: '15px'}}>
            Participate in book exchange events, connect with fellow readers, and expand your personal library with exciting new titles.
          </p>
          <div className="d-flex flex-column flex-lg-row gap-3 mt-4">
            {/* <Link className="btn hero-button btn-lg rounded-pill">
              Host an Event
            </Link> */}
            <Link
              className="btn hero-button btn-lg rounded-pill"
              to="/dashboard"
            >
              Track Your Swaps
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-lg-6 text-center mt-4 mt-lg-0">
          <img
            src="https://img.freepik.com/premium-photo/close-up-woman-man-hands-is-holding-diplomas-shaking-hands_360066-18701.jpg?w=1380"
            alt="Book Exchange Event"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default CodingContests;
