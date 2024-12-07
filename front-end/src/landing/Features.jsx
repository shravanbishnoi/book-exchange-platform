import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Features.css';
import {Link} from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'Easy Book Swaps',
      description: 'Effortlessly exchange books with others using our streamlined platform.',
      link: 'Start Swapping',
      img: 'https://img.freepik.com/premium-vector/success-vs-knowledge-woman-sitting-pile-books-man-pile-money_1316704-27784.jpg?w=1480',
    },
    {
      title: 'Community Connections',
      description: 'Connect with readers who share your interests and discover new genres.',
      link: 'Find Readers',
      img: 'https://img.freepik.com/free-vector/concept-house-searching-landing-page_52683-26512.jpg?t=st=1733554091~exp=1733557691~hmac=9582b03add4158739616ae3f7d775d1384dda84f1e2f702f8751f9dad7256b07&w=1380',
    },
    {
      title: 'Track Your Collection',
      description: 'Manage your exchanges and track your personal library with ease.',
      link: 'Manage Collection',
      img: 'https://img.freepik.com/free-vector/bestseller-books-stand-wooden-bookshelf-booklet-diary-volumes-with-colorful-paperback-lying-pile-flying-shelf-hanging-wall-library-store-cartoon-vector-illustration_107791-4208.jpg?t=st=1733554117~exp=1733557717~hmac=bed31f54e578c5c8012e0197c9064bdc2bd6fd2b189aa2a465e723883176253b&w=1380',
    },
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <p className="text-uppercase text-muted">Discover and Share</p>
        <h1 className="display-5 fw-bold">Your Book Exchange Hub</h1>
        <p className="text-muted lead">
          Simplifying book exchanges and helping you connect with fellow readers.
        </p>
      </div>

      {/* Features Section */}
      <div className="row features">
        {features.map ((feature, index) => (
          <div key={index} className="col-lg-3 col-md-2 col-xs-2 text-center">
            <div className="card p-4 border-0 shadow-sm custom-card">
              <img
                src={feature.img}
                style={{borderRadius: '5px', width: '300px', height: '200px'}}
                alt={feature.title}
                className="img-fluid mb-3"
              />
              <h4
                className="fw-bold"
                style={{paddingTop: '10px', textAlign: 'start'}}
              >
                {feature.title}
              </h4>
              <p
                className="text-muted"
                style={{paddingTop: '5px', textAlign: 'start'}}
              >
                {feature.description}
              </p>
              <Link
                to="/dashboard"
                className="fw-bold"
                style={{textAlign: 'start', textDecoration: 'none'}}
              >
                {feature.link}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
