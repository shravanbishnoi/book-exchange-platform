import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "./context/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showSwalAlert from "./utilities/AlertComponents";
import Navbar from "./landing/Navbar";
const Signup = () => {
  const { signup } = useUser(); // Get the login function from the user context
  const navigate = useNavigate()

  // State to manage form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the login function with email and password
      console.log(email, name, password)
      const signedUp = await signup(email, password, name);
      if (signedUp) {
        navigate("/dashboard")
      }
      // Optional: Handle post-login UI
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: "Signup unsuccessful",
        text: "Either Invalid Credential or wrong email",
      });
    }
  };

  return (
    <div>
      <Navbar />

    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col xs={12} md={6} lg={12}>
          <h3 className="text-center mb-4">Signup</h3>
          <Form onSubmit={handleSignupSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Signup Button */}
            <Button variant="success" type="submit" className="w-100">
              Signup
            </Button>

            {/* Login Link */}
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Signup;
