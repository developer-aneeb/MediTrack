import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AuthLayout = ({ children }) => {
  return (
    <Container fluid className="auth-container d-flex align-items-center justify-content-center py-4 py-md-5">
      <Row className="auth-row g-0 w-100">
        {/* Form Column - Mobile first */}
        <Col xs={12} md={6} className="auth-form-col d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-5">
          <div className="auth-form-content w-100">
            {children}
          </div>
        </Col>

        {/* Image Column - Hidden on mobile, visible from md up */}
        <Col md={6} className=" d-none d-md-flex">
          <div className=" h-100 position-relative">
            <Image 
              src="/login.jpg" 
              alt="Login Illustration" 
              className="auth-image h-100 w-100"
              fluid
            />
            {/* Optional overlay content */}
            <div className="auth-image-overlay position-absolute bottom-0 start-0 end-0 text-center p-3 p-lg-4">
              <h3 className="mb-2">RxEaseAI</h3>
              <p className="mb-0">Making Prescriptions Clear and Accessible</p>
            </div>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .auth-row {
          min-height: calc(100vh - 40px);
          margin: 0 auto;
          max-width: 1200px;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .auth-form-col {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        
        .auth-form-content {
          width: 100%;
          max-width: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .auth-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .auth-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 1.5rem;
          text-align: center;
        }
        
        .auth-image-overlay h3 {
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 767.98px) {
          .auth-row {
            min-height: auto;
          }
          
          .auth-form-col {
            padding: 1.5rem;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991.98px) {
          .auth-form-content {
            max-width: 350px;
          }
        }
        
        @media (min-width: 992px) {
          .auth-image-overlay {
            padding: 2rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default AuthLayout;