import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaCheck } from 'react-icons/fa';
import { Form, Button, InputGroup, Image, Alert } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Signup = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData.username, formData.email, formData.password);
      if (result && result.token) {
        // If onAuthSuccess prop exists, call it with user data
        if (onAuthSuccess) {
          onAuthSuccess(result.user);
        }
        navigate('/home');
      }
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Registration failed:', err);
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
        <h2 className="display-5 fw-bold mb-2">Sign up</h2>
        <p className="text-muted">Welcome to RxEaseAI - Let's create account</p>
      </div>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="fw-medium">Name</Form.Label>
          <InputGroup className="has-validation">
            <InputGroup.Text><FaUser /></InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="rounded-end"
            />
          </InputGroup>
        </Form.Group>

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
              placeholder="Create your password"
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

        <Form.Group className="mb-4" controlId="formPrivacyPolicy">
          <Form.Check 
            type="checkbox"
            label={<>I agree to the <Link to="#" className="text-decoration-none">Privacy&Policy</Link></>}
            checked={agreeToPolicy}
            onChange={(e) => setAgreeToPolicy(e.target.checked)}
            required
          />
        </Form.Group>

        <Button 
          variant="success" 
          type="submit" 
          className="w-100 rounded-pill py-3 fw-bold"
          disabled={!agreeToPolicy || loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </Form>

      <div className="text-center mt-2 pt-2 border-top">
        <p className="text-muted mb-2">Already have an account?</p>
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

export default Signup;