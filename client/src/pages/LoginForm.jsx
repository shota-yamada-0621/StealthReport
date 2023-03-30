import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './static/LoginForm.css';
import { Link } from 'react-router-dom';



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 6 }}>
            <h2 className="text-center mb-4">User Login</h2>
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <p className="mt-3 text-center">Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
