import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../dashboard/Navbar";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditProfileModal from "./EditProfileModal";
import { BASE_SERVER_URL, API } from "../Constants";
import { useUser } from "../context/user";
import showSwalAlert from "../utilities/AlertComponents";
import AddBookModal from "../AddBook";
import LoadingOverlay from 'react-loading-overlay-ts';
import PulseLoader from 'react-spinners/PulseLoader';

const ProfilePage = () => {
  const { current: user } = useUser();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lendBooks, setLendBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = BASE_SERVER_URL + API + "users/" + user?.uid;
  const transactionUrl = BASE_SERVER_URL + API + "transactions" + "/user/" + user?.uid;
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    location: "New York, USA",
    role: "Borrower",
    rating: 4.0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);

        // Update state variables with fetched data
        setWishlist(data.wishlist);
        setLendBooks(data.lend_books);
        // Update profile state
        setProfile((prevProfile) => ({
          ...prevProfile, // Retain unchanged properties
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
        }));
      } catch (error) {
        console.error("There was an error!", error);
      }
      setLoading(false)
    };

    if (user?.uid) {
      fetchData();
    }
  }, [user, triggerUpdate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(transactionUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);
        setTransactions(data)
      } catch (error) {
        console.error("There was an error!", error);
      }
      setLoading(false)
    };

    if (user?.uid) {
      fetchData();
    }
  }, [user, triggerUpdate]);

  const [userProfile, setUserProfile] = useState(profile);

  // Handle Save
  const handleSave = (updatedProfile) => {
    setUserProfile(updatedProfile); // Update the user's profile
  };

  const deleteFromWishlist = async (bookId) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_SERVER_URL}${API}users/${user?.uid}/wishlist/`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book to wishlist");
      }

      const updatedUser = await response.json();
      if (updatedUser) {
        setTriggerUpdate(!triggerUpdate);
        showSwalAlert({
          icon: "success",
          title: "Book Deleted from Wishlist",
          text: "Move to Dashboard to add more",
        });
      }

      console.log("Wishlist updated:", updatedUser.wishlist);
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: error.code,
        text: error.message,
      });
    }
    setLoading(false)
  };

  const handleDeleteLend = async (bookId) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_SERVER_URL}${API}users/${user?.uid}/lendlist/`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book to wishlist");
      } else {
        setTriggerUpdate(!triggerUpdate);
        showSwalAlert({
          icon: "success",
          title: "Book Deleted from Lend List",
          text: "You can add more with just one click.",
        });
      }
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: error.code,
        text: error.message,
      });
    }
    setLoading(false)
  };


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
      <LoadingOverlay
        active={loading}
        text="Please hold tight. While we fetch your records."
        spinner={
          <PulseLoader
            color="black"
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <div className="card shadow-sm mb-4">
          <div className="card-body text-center">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&size=150`}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{profile.name}</h4>
            <p>{profile.email.split("@")[0]}</p>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
            <p>{profile?.location || "New York, USA"}</p>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <span>Rating:</span>
              <span className="text-warning">★★★★☆</span> {profile?.rating}
            </div>
            <Button onClick={() => setShowModal(true)} variant="primary">
              Edit Profile
            </Button>

            {/* Modal */}
            <EditProfileModal
              show={showModal}
              handleClose={() => setShowModal(false)}
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
              <div className="card-header bg-primary text-white text-center">
                Wishlist
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((wish, index) => (
                      <tr key={index}>
                        <td>{wish.title}</td>
                        <td>{wish.author}</td>
                        <td>{wish.genre}</td>
                        <td>
                          <button
                            class="btn btn-danger btn-sm rounded-pill shadow"
                            onClick={() => deleteFromWishlist(wish._id)}
                          >
                            <i class="bi bi-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Books for Lending Table */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white text-center">
                Books for Lending
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lendBooks.map((lend, index) => (
                      <tr key={index}>
                        <td>{lend.title}</td>
                        <td>{lend.author}</td>
                        <td>{lend.genre}</td>
                        <td>
                          <AddBookModal bookId={lend._id} setTriggerUpdate={setTriggerUpdate} triggerUpdate={triggerUpdate}/>
                          <Button
                            className="btn btn-danger shadow text-white"
                            onClick={() => handleDeleteLend(lend._id)}
                            style={{
                              padding: "15px, 20px",
                              marginLeft: "1px",
                              backgroundColor: "reddish",
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white text-center">
                Transaction History
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Lender Name</th>
                      <th>Borrower Name</th>
                      <th>Transaction Type</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.lender_id?.name}</td>
                        <td>{transaction.borrower_id?.name}</td>
                        <td>{transaction.type}</td>
                        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                        <td>{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default ProfilePage;
