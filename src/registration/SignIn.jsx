import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaCheck, FaUserPlus } from 'react-icons/fa';
import { Form, Button, InputGroup, Image, Alert } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const SignIn = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData.email, formData.password);
      if (result && result.token) {
        // If onAuthSuccess prop exists, call it with user data
    if (onAuthSuccess) {
          onAuthSuccess(result.user);
        }
        // Navigate to home page after successful login
        navigate('/home', { replace: true });
      }
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Login failed:', err);
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
        <h2 className="display-5 fw-bold mb-2">Sign In</h2>
        <p className="text-muted">Welcome back to RxEaseAI</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
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
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              className="rounded-end"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="fw-medium">Password</Form.Label>
          <InputGroup className="has-validation">
            <InputGroup.Text><FaLock /></InputGroup.Text>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="rounded-start"
            />
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-end"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Group controlId="formRememberMe">
            <Form.Check 
              type="checkbox" 
              label={<> <FaCheck className="me-2" /> Remember me</>}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-muted"
            />
          </Form.Group>
          <Link to="/forgot-password" className="text-decoration-none fw-medium">
            Forgot password?
          </Link>
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 rounded-pill py-3 fw-bold"
          disabled={loading}
        >
          {loading ? 'Signing in...' : (
            <>
          <FaSignInAlt className="me-2" />
          Sign In
            </>
          )}
        </Button>
      </Form>

      <div className="text-center mt-2 pt-2 border-top">
        <p className="text-muted mb-2">Don't have an account?</p>
        <Link 
          to="/signup" 
          className="btn btn-outline-success rounded-pill px-4 fw-medium"
        >
          <FaUserPlus className="me-2" />
          Create Account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;