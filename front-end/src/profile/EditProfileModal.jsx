import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../context/user";
import { BASE_SERVER_URL, API } from "../Constants";

const EditProfileModal = ({ show, handleClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState(userProfile || {});
  const { current: user } = useUser();
  const userid = user?.uid;

  // Fetch user data when the modal opens
  useEffect(() => {
    if (show && userid) {
      (async () => {
        try {
          const response = await axios.get(`${BASE_SERVER_URL}${API}users/${userid}`);
          setFormData(response.data); // Autofill with user data
        } catch (error) {
          console.error("Error fetching user data:", error.response?.data);
          alert("Failed to fetch user profile. Please try again.");
        }
      })();
    }
  }, [show, userid]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_SERVER_URL}${API}users/${userid}`, formData);
      onSave(response.data); // Update parent component with the new data
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user profile:", error.response?.data);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Enter your location"
              required
            />
          </Form.Group>

          {/* Save Button */}
          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
