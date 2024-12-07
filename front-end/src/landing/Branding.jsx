import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './Branding.css';

const BrandingPage = () => {
  return (
    <div className="container my-5">
      <div className="row branding-row align-items-center">
        {/* Image Section */}
        <div className="col-lg-6 text-center">
          <img
            alt="Book Exchange"
            src="https://img.freepik.com/free-photo/front-view-hardback-books-library-with-light-box_23-2148827226.jpg?t=st=1733553471~exp=1733557071~hmac=c2b555bf35dcc045fd08c09c4ac5bc1a85f083064df8d1d5c98a4f379d35edfe&w=1380"
            className="img-fluid banner-images"
          />
        </div>

        {/* Text Section */}
        <div className="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
          <p className="text-uppercase text-muted small">
            Explore the World of Books
          </p>
          <h1 className="display-5 fw-bold text-primary">
            Welcome to the Book Exchange Community
          </h1>
          <p className="lead text-muted">
            Discover, share, and swap your favorite books with fellow readers. Join a thriving community of book lovers today!
          </p>
          <Link
            className="hero-button btn btn-lg rounded-pill mt-3"
            to="/dashboard"
          >
            Start Exchanging
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;
