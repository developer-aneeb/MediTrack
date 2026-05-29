import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const AppNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image 
            src="/logo.jpg" 
            alt="RxEaseAI Logo"
            width="40"
            height="40"
            className="me-2 rounded-circle"
          />
          <span className="fw-bold fs-4">RxEaseAI</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home" className="mx-2 fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/prescription-entry" className="mx-2 fw-semibold">Prescription</Nav.Link>
            <Nav.Link as={Link} to="/reminders" className="mx-2 fw-semibold">Reminders</Nav.Link>
            <Nav.Link as={Link} to="/search" className="mx-2 fw-semibold">Search</Nav.Link>
            <Nav.Link as={Link} to="/prescription-history" className="mx-2 fw-semibold">History</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/profile" className="me-3">
              <FaUserCircle size={30} className="text-white" />
            </Nav.Link>
            <Button 
              variant="outline-light" 
              onClick={handleLogout}
              className="d-flex align-items-center gap-2 rounded-pill px-3"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar; 