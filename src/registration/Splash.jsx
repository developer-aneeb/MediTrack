import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const Splash = () => {
  return (
    <Container fluid className="d-flex flex-column flex-md-row justify-content-center align-items-center min-vh-100 bg-light p-4">
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start p-4">
          <h1 className="display-3 fw-bold text-primary mb-3">
            Rx<span className="text-success">Ease</span><span className="text-warning">AI</span>
          </h1>
          <p className="lead text-secondary mb-4">
            Your Digital Sehat Nigehban (Health Guardian)
          </p>
          <p className="text-muted mb-4">
            <span className="text-warning fw-bold">"Dawai Sahi, Sehat Achi!"</span> 🇵🇰<br/>
            Never struggle with <span className="fst-italic">"Doctor ki likhai"</span> again! RxEaseAI converts confusing handwritten prescriptions into clear digital records with our <span className="text-warning">AI-powered</span> system.
            
            <br/><br/>
            
            Get <span className="text-warning">smart medicine reminders</span> (<span className="text-warning">"Beta, dawai le lo!"</span>), store all prescriptions securely, and access drug information instantly. Share records with family doctors in one click - because <span className="fst-italic">"Tandrusti Hazar Naimat Hai!"</span>
            
            <br/><br/>
            
            <span className="d-block text-success fw-bold">Key Features:</span>
            • <span className="text-warning">AI</span>-Powered Prescription Scanner<br/>
            • Digital Medicine Vault<br/>
            • Smart Reminders & Alerts<br/>
            • Family Sharing<br/>
            • Drug Encyclopedia
          </p>
          <div className="d-flex gap-3">
            <Link to="/signup">
              <Button variant="warning" className="d-flex align-items-center fw-semibold py-3 px-4 rounded-pill shadow-sm">
                <FaUserPlus className="me-2" />
                SIGN UP
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="success" className="d-flex align-items-center fw-semibold py-3 px-4 rounded-pill shadow-sm">
                SIGN IN
                <FaSignInAlt className="ms-2" />
              </Button>
            </Link>
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center p-4">
          <Image src="/Rxease.jpg" alt="RxEaseAI Illustration" fluid className="mw-100 h-auto rounded shadow" />
        </Col>
      </Row>
    </Container>
  );
};

export default Splash;