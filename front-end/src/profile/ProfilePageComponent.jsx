import React from "react";
import "./ProfilePage.css";
import user1 from "../assets/user1.jpeg";
import Navbar from "../dashboard/Navbar";

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <div className="profile-container mt-5">
        <div className="profile-header">
          <div className="profile-left">
            <div className="user-avatar">
              {/* Avatar image with fixed size and round shape */}
              <img
                src={user1} // Replace this with your image URL
                alt="Avatar"
                className="avatar-image"
              />
            </div>
          </div>
          <div className="profile-right">
            <div className="user-details">
              <h2>Narayan Jat</h2>
              <p>@narayanjat2964</p>
              <p>Shri Ramswaroop Memorial University with Sitare</p>
              <p>Email: nj223948@gmail.com</p>
              <p>Phone: 9079622236</p>
              <p>India</p>
              <button className="edit-btn">Edit</button>
            </div>
          </div>
        </div>

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
