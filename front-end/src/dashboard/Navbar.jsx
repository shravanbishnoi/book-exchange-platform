import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './Navbar.css';
import AddBookModal from '../AddBook';
import { useUser } from '../context/user';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState (false);
  const { logout } = useUser();
  const navigate = useNavigate();

  // Handlers to show and hide modal
  const handleShowModal = () => setShowModal (true);
  const handleCloseModal = () => setShowModal (false);

  const handleLogout = async () => {
    const response = await logout();
    if (response){
      navigate("/")
    }
  }
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
            <span className="navbar-toggler-icon" />
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
                <AddBookModal show={showModal} onClose={handleCloseModal} />
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/">
                  Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/">
                  Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link1 hover-button" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Add Book Modal */}
    </div>
  );
};

export default Navbar;
