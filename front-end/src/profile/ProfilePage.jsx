import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import user1 from '../assets/user1.jpeg';
import Navbar from '../dashboard/Navbar';
import {useState} from 'react';
import {Button} from 'react-bootstrap';
import EditProfileModal from './EditProfileModal';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState (false);

  const initialProfile = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    location: 'New York, USA',
    role: 'Borrower',
    rating: 4.0,
  };

  const [userProfile, setUserProfile] = useState (initialProfile);

  // Handle Save
  const handleSave = updatedProfile => {
    setUserProfile (updatedProfile); // Update the user's profile
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow-sm mb-4">
          <div className="card-body text-center">
            <img
              src={user1}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{width: '150px', height: '150px', objectFit: 'cover'}}
            />
            <h4>John Doe</h4>
            <p>@johndoe123</p>
            <p>Email: johndoe@example.com | Phone: 123-456-7890</p>
            <p>Location: New York, USA</p>
            <p>Role: Borrower</p>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <span>Rating:</span>
              <span className="text-warning">★★★★☆</span> (4.0)
            </div>
            <Button onClick={() => setShowModal (true)} variant="primary">
              Edit Profile
            </Button>

            {/* Modal */}
            <EditProfileModal
              show={showModal}
              handleClose={() => setShowModal (false)}
              userProfile={userProfile}
              onSave={handleSave}
            />
          </div>
        </div>

        {/* Tables Section */}
        <div className="row">
          {/* Wishlist Table */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">Wishlist</div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Added On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>The Great Gatsby</td>
                      <td>F. Scott Fitzgerald</td>
                      <td>Fiction</td>
                      <td>2024-01-01</td>
                    </tr>
                    <tr>
                      <td>1984</td>
                      <td>George Orwell</td>
                      <td>Dystopian</td>
                      <td>2024-01-02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Books for Lending Table */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                Books for Lending
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Lending Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>To Kill a Mockingbird</td>
                      <td>Harper Lee</td>
                      <td>Classics</td>
                      <td>2023-12-15</td>
                    </tr>
                    <tr>
                      <td>The Catcher in the Rye</td>
                      <td>J.D. Salinger</td>
                      <td>Classics</td>
                      <td>2023-12-20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white">
                Transaction History
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Book Name</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>The Great Gatsby</td>
                      <td>Borrow</td>
                      <td>2024-01-10</td>
                      <td>
                        <span className="badge bg-success">Success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>1984</td>
                      <td>Borrow</td>
                      <td>2024-01-12</td>
                      <td>
                        <span className="badge bg-danger">Failed</span>
                      </td>
                    </tr>
                    <tr>
                      <td>To Kill a Mockingbird</td>
                      <td>Lend</td>
                      <td>2023-12-18</td>
                      <td>
                        <span className="badge bg-warning">Pending</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
