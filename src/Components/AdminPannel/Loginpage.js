import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loginpage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post('http://49.204.232.254:90/admin/login', {
          username: formData.username,
          password: formData.password,
        });
        setSuccess('Login successful!');
        navigate('/dashboard'); // Navigate to AdminDashboard on successful login
        console.log(response.data); // Handle successful response
      } else {
        // Signup API call
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match!');
          return;
        }
        const response = await axios.post('http://49.204.232.254:90/admin/submit', {
          username: formData.username,
          password: formData.password,
        });
        setSuccess('Signup successful! Please login.');
        console.log(response.data); // Handle successful response
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="background-image">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4 mb-5 bg-white rounded glass-effect">
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {isLogin ? (
              <LoginForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            ) : (
              <SignupForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            )}
            <Button variant="link" onClick={toggleForm} className="toggle-button">
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const LoginForm = ({ formData, handleInputChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <h2 className="text-center mb-4">Admin Login</h2>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Name"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword" className="mt-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Button variant="primary" type="submit" className="mt-4 w-100">
      Login
    </Button>
  </Form>
);

const SignupForm = ({ formData, handleInputChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <h2 className="text-center mb-4">Admin Sign Up</h2>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Name"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword" className="mt-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Button variant="success" type="submit" className="mt-4 w-100">
      Sign Up
    </Button>
  </Form>
);

export default Loginpage;
