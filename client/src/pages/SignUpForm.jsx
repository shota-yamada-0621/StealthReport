import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './static/LoginForm.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{display:"flex", justifyContent:"center"}}>
      <Container className="my-5 p-5 rounded" style={{backgroundColor:"#FCE4EC"}}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mb-5">User Signup</h1>
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <br></br>
              <Button variant="warning" type="submit" className="btn-block">
                Create User
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupForm;
