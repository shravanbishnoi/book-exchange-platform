import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import Navbar from "../dashboard/Navbar";
import notification from "./notification.jpg";
import { useUser } from "../context/user";
import { BASE_SERVER_URL, API } from "../Constants.js";
import LoadingOverlay from "react-loading-overlay-ts";
import PulseLoader from "react-spinners/PulseLoader";

const NotificationsPage = () => {
  // Handle Confirm Lend
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { current: user } = useUser();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const url = BASE_SERVER_URL + API + "transactions" + "/user/" + user?.uid;
  const updateUrl = BASE_SERVER_URL + API + "transactions/";
  useEffect(() => {
    // Fetch transactions related to the user
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch transactions.");
        }

        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [triggerUpdate]);

  const handleConfirmLend = async (id) => {
    setLoading(true);
    console.log(`Lend request confirmed for transaction ID: ${id}`);
    try {
      const response = await fetch(updateUrl + id + "/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Success" }),
      });
      if (response.ok) {
        showSwalAlert({
          icon: "success",
          title: "Book Lended Successfully",
          text: "Please contact the borrower for futther query.",
        });
        handleClose();
        setTriggerUpdate(!triggerUpdate);
      }
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: error.code,
        text: error.message,
      });
    }
    setLoading(false);
  };

  // Handle Deny Lend
  const handleDenyLend = async (id) => {
    console.log(`Lend request denied for transaction ID: ${id}`);
    try {
      const response = await fetch(updateUrl + id + "/  ", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Denied" }),
      });
      if (response.ok) {
        showSwalAlert({
          icon: "success",
          title: "Request Denied Successfully",
          text: "Please contact the borrower for futther query.",
        });
        handleClose();
        setTriggerUpdate(!triggerUpdate);
      }
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: error.code,
        text: error.message,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-4">
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
          <Row>
            {transactions.map((transaction, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Borrow Request</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Borrower: {transaction.borrower_id.name}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Book:</strong> {transaction.book_id.title} <br />
                      <strong>Request Date:</strong>{" "}
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        onClick={() => handleConfirmLend(transaction._id)}
                      >
                        Confirm Lend
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDenyLend(transaction._id)}
                      >
                        Deny Lend
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {transactions.length === 0 && (
            <div className="text-center mt-5">
              <img
                src={notification}
                style={{ width: "300px", height: "auto" }}
              />
              <p className="mt-3 text-muted">
                You have no pending notifications.
              </p>
            </div>
          )}
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default NotificationsPage;
