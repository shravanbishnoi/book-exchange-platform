import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUser } from "../src/context/user";
import { BASE_SERVER_URL, API } from "./Constants";
import showSwalAlert from "../src/utilities/AlertComponents";
import "./AddBook.css";
import { Link } from "react-router-dom";

const AddBookModal = ({ bookId, setTriggerUpdate, triggerUpdate }) => {
  const [show, setShow] = useState(false);
  const { current: user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    genre: "",
    condition: "",
    image_url: "",
    availability: true,
  });

  const url = BASE_SERVER_URL + API + "books/" + bookId;
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        } else {
          const data = await response.json();
          const book = data;
          console.log(book);
          setFormData({
            bookName: book.title || "",
            authorName: book.author || "",
            genre: book.genre || "",
            condition: book.condition || "",
            image_url: book.image_url || "",
            // Add any other fields as necessary
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

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
        owner_id: user?.uid,
      };
      console.log(data);
      const response = (await bookId)
        ? fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
        : fetch(`${BASE_SERVER_URL}${API}books/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      showSwalAlert({
        icon: "success",
        title: bookId ? "Book updated successfully" : "Book Added successfully",
        text: "",
      });
      handleClose();
      if (bookId) {
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
    <>
      {bookId ? (
        <Button
        variant="primary"
        className="text-white"
        style={{ padding: "5px 20px" }}
        onClick={handleShow}
      >
        {bookId ? "Edit" : "Add a Book"}
      </Button>
      ) : (
        <Link
        // variant="primary"
        className="add-book-button"
        style={{ padding: "5px 20px" }}
        onClick={handleShow}
      >
        {bookId ? "Edit" : "Add a Book"}
      </Link>
      )}

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
