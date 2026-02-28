import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowRight, FaLock } from 'react-icons/fa';
import { Form, Button, InputGroup, Image, Alert } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
    setMessage('If your email is registered, you will receive a password reset link.');
    setEmail(''); // Clear the email input
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Password reset request failed:', err);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <Image 
          src="/logo.jpg" 
          alt="Logo"
          width="80"
          height="80"
          className="mb-3"
        />
        <h2 className="display-5 fw-bold mb-2">Forgot Password</h2>
        <p className="text-muted">Enter your email to reset your password</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {message && (
        <Alert variant="success" className="mb-3">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-medium">E-mail</Form.Label>
          <InputGroup className="has-validation">
            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your address"
              className="rounded-end"
            />
          </InputGroup>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 rounded-pill py-3 fw-bold"
          disabled={loading}
        >
          {loading ? 'Sending...' : (
            <>
          Send Reset Link
          <FaArrowRight className="ms-2" />
            </>
          )}
        </Button>
      </Form>

      <div className="text-center mt-2 pt-2 border-top">
        <p className="text-muted mb-2">Remember your password?</p>
        <Link 
          to="/signin" 
          className="btn btn-outline-primary rounded-pill px-4 fw-medium"
        >
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword; 