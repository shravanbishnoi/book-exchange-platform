import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../src/context/user";
import { BASE_SERVER_URL, API } from "./Constants";

const AddBookModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    genre: "",
    condition: "",
    image_url: "",
    availability: true,
    owner_id: "a"
  });

  const { current: user } = useUser(); // Get the logged-in user's ID

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = {
            title: formData.bookName,
            author: formData.authorName,
            genre: formData.genre,
            condition: formData.condition,
            image_url: formData.image_url,
            availability: true,
            owner_id: "a"
          }
      const response = await fetch(`${BASE_SERVER_URL}${API}books/`, {
        method: "POST", // Correct method format
        headers: { 
          "Content-Type": "application/json" // Correct header key
        },
        body: JSON.stringify(data)
      });
      // Clear the form and close the modal
      setFormData({
        bookName: "",
        authorName: "",
        genre: "",
        condition: "",
        image_url: "",
        availability: true,
        owner_id: "a"
      });
      handleClose();
    } catch (error) {
      console.error("Error adding book:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while adding the book. Please try again."
      );
    }
  };

  return (
    <>
      {/* Button to Open Modal */}
      <Button variant="primary" onClick={handleShow}>
        Add a Book
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the book name"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the author's name"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Old">Old</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Cover Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Add Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBookModal;
