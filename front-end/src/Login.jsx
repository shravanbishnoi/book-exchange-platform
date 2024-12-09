import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "./context/user";
import { useNavigate } from "react-router-dom";
import showSwalAlert from "./utilities/AlertComponents";
import Navbar from "./landing/Navbar";
const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        navigate("/dashboard")
      }
    } catch (error) {
      showSwalAlert({
        icon: "error",
        title: "Login unsuccessful",
        text: "Either Invalid Credential or user does not exits",
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
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleLoginSubmit}>
            {/* Email Input */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </Form.Group>

            {/* Login Button */}
            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>

            {/* Signup Link */}
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Login;
