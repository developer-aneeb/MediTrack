import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock 
} from 'react-icons/fa';

const AppFooter = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-3" style={{ borderTop: '5px solid #ffc107' }}>
      <Container>
        <Row className="g-4">
          {/* About Column */}
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src="/logo.jpg" 
                alt="RxEaseAI Logo" 
                width="50" 
                height="50"
                className="rounded-circle border border-2 border-warning me-2"
              />
              <h4 className="fw-bold mb-0 text-warning">RxEaseAI</h4>
            </div>
            <p className="mb-3">
              "Sehat ka Digital Nigehban" - Your AI-powered prescription assistant making medication management easier for Pakistanis.
            </p>
            <div className="d-flex align-items-center mb-2">
              <FaMapMarkerAlt className="text-warning me-2" />
              <span>Lahore, Pakistan</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaClock className="text-warning me-2" />
              <span>24/7 Sehat Service</span>
            </div>
          </Col>

          {/* Quick Links Column */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold text-warning mb-3">Taaquib Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <span className="bullet-point bg-warning me-2"></span>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <span className="bullet-point bg-warning me-2"></span>
                  Prescription Scan
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <span className="bullet-point bg-warning me-2"></span>
                  Dawaai Reminders
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <span className="bullet-point bg-warning me-2"></span>
                  Pakistani Drug Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none d-flex align-items-center">
                  <span className="bullet-point bg-warning me-2"></span>
                  Hamary Baary Mein
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Column */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold text-warning mb-3">Rabta Karein</h5>
            <div className="mb-3">
              <h6 className="fw-bold">Hamary Developers:</h6>
              <p className="mb-1">Aneeb ur Rehman</p>
              <p className="mb-1">Usman Tahir</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="text-warning me-2" />
              <a href="tel:+923134567890" className="text-white text-decoration-none">+92 313 456 7890</a>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="text-warning me-2" />
              <a href="mailto:info@rxeaseai.com" className="text-white text-decoration-none">info@rxeaseai.com</a>
            </div>
            <div className="social-icons">
              <a href="#" className="text-white me-3">
                <FaFacebook size={20} className="hover-grow" />
              </a>
              <a href="#" className="text-white me-3">
                <FaTwitter size={20} className="hover-grow" />
              </a>
              <a href="#" className="text-white me-3">
                <FaInstagram size={20} className="hover-grow" />
              </a>
              <a href="#" className="text-white">
                <FaLinkedin size={20} className="hover-grow" />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-warning" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} RxEaseAI. Tamam Haqooq Mahfooz.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              Made with <span className="text-warning">♥</span> in Pakistan
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .bullet-point {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .hover-grow {
          transition: transform 0.3s ease;
        }
        .hover-grow:hover {
          transform: scale(1.2);
          color: #ffc107 !important;
        }
        a:hover {
          color: #ffc107 !important;
        }
      `}</style>
    </footer>
  );
};

export default AppFooter;