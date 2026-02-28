import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Image, Accordion } from 'react-bootstrap';
import { FaCamera, FaSearch, FaBell, FaHistory, FaUserMd, FaPills, FaHospital, FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';

const HomePage = () => {
  // Features data
  const features = [
    {
      icon: <FaCamera size={40} className="text-primary" />,
      title: "Prescription Scan",
      description: "OCR technology to digitize handwritten prescriptions",
      link: ""
    },
    {
      icon: <FaSearch size={40} className="text-success" />,
      title: "Medicine Search",
      description: "Find detailed information about your medications",
      link: "/search"
    },
    {
      icon: <FaBell size={40} className="text-warning" />,
      title: "Medication Reminders",
      description: "Never miss a dose with timely notifications",
      link: "/reminders"
    },
    {
      icon: <FaHistory size={40} className="text-info" />,
      title: "Prescription History",
      description: "Track and manage all your prescriptions",
      link: "/prescription-history"
    }
  ];

  // Recent activities
  const [recentActivities] = useState([
    { 
      text: "Scanned prescription from Dr. Ahmed (Shifa International)", 
      time: "Aaj, 10:30 AM",
      icon: <FaUserMd className="text-primary me-2" />
    },
    { 
      text: "Reminder: Panadol 500mg (2 pills)", 
      time: "Kal, 2:00 PM",
      icon: <FaPills className="text-success me-2" />
    },
  ]);

  // Trusted hospitals
  const hospitals = [
    { name: "Shifa International", logo: "/hospital1.jpg" },
    { name: "Aga Khan Hospital", logo: "/hospital2.jpg" },
    { name: "Liaquat National", logo: "/hospital1.jpg" },
    { name: "CMH Lahore", logo: "/hospital4.jpg" }
  ];

  // Statistics
  const stats = [
    { value: "10,000+", label: "Prescriptions Scanned" },
    { value: "75%", label: "Accuracy Rate" },
    { value: "20+", label: "Hospitals Trust Us" },
    { value: "24/7", label: "Support Available" }
  ];

  // FAQ items
  const faqs = [
    {
      question: "Kya ye service Pakistan mein available hai?",
      answer: "Ji haan, ye service pure Pakistan mein available hai aur Pakistani doctors ke prescriptions ko specially handle karti hai."
    },
    {
      question: "Mujhe apne mobile se kaise connect karna hoga?",
      answer: "Simple! Just download our app from Play Store/App Store ya web version use karein directly."
    },
    {
      question: "Kya mera data secure rahega?",
      answer: "Bilkul! Hum HIPAA compliant hain aur apka data poori tarah secure hai."
    }
  ];

  // Feature Card Component
  const FeatureCard = ({ icon, title, description, link }) => (
    <Card className="h-100 border-0 shadow-sm hover-effect">
      <Card.Body className="text-center p-4">
        <div className="mb-3">{icon}</div>
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted">{description}</p>
        <Button 
          variant="outline-primary" 
          size="sm" 
          as={Link} 
          to={link}
          className="rounded-pill px-3"
        >
          Try Now
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <div className="home-page">
      <AppNavbar />

      {/* Hero Section */}
      <section className="hero-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold text-primary mb-3">
                <span className="text-warning">RxEaseAI</span> - Apka Digital Sehat Nigehban
              </h1>
              <p className="lead mb-4">
                Pakistan's first AI-powered prescription management system. Doctor ki likhai ab samajhna aasan!
              </p>
              <div className="d-flex gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="rounded-pill px-4 fw-bold"
                  as={Link} 
                  to="/scan"
                >
                  <FaCamera className="me-2" />
                  Prescription Scan Karein
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="lg" 
                  className="rounded-pill px-4"
                  as={Link} 
                  to="/medicine"
                >
                  Dawaai Database
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <Image 
                src="/Rxease.jpg" 
                alt="RxEaseAI App Preview" 
                roundedCircle 
                width={300} 
                height={300} 
                className="me-3 border border-2 border-primary"
                loading="lazy"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-section py-4 bg-white">
        <Container>
          <h6 className="text-center text-muted mb-3">TRUSTED BY LEADING HOSPITALS IN PAKISTAN</h6>
          <Row className="align-items-center justify-content-center g-4">
            {hospitals.map((hospital, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <div className="d-flex flex-column align-items-center">
                  <Image 
                    src={hospital.logo} 
                    alt={hospital.name} 
                    roundedCircle   
                    className="me-3 border border-2 border-primary"
                    style={{ width: '100px',height: '100px' }}
                    loading="lazy"
                  />
                  <small className="text-muted mt-2">{hospital.name}</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">
            <span className="border-bottom border-3 border-primary pb-2">Hamari Khasa Sifat</span>
          </h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} xs={12} sm={6} md={3}>
                <FeatureCard {...feature} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            {stats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="p-3">
                  <h3 className="text-primary fw-bold">{stat.value}</h3>
                  <p className="mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">
            <span className="border-bottom border-3 border-success pb-2">Kaise Kaam Karta Hai?</span>
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    1
                  </div>
                  <h5 className="fw-bold">Prescription Upload Karein</h5>
                  <p className="text-muted">Apna handwritten prescription scan karein ya photo upload karein</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="step-number bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    2
                  </div>
                  <h5 className="fw-bold">AI Analysis</h5>
                  <p className="text-muted">Hamara AI system apki prescription ko analyze karega</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="step-number bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '50px', height: '50px'}}>
                    3
                  </div>
                  <h5 className="fw-bold">Digital Record</h5>
                  <p className="text-muted">Apko milega complete digital record aur reminders</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">
            <span className="border-bottom border-3 border-info pb-2">Taza Tareen Sargarmiyaan</span>
          </h2>
          <Row className="justify-content-center">
            <Col md={8}>
              {recentActivities.map((activity, index) => (
                <Card key={index} className="mb-3 border-0 shadow-sm hover-effect">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={1} className="pe-0">
                        {activity.icon}
                      </Col>
                      <Col xs={8}>
                        <p className="mb-0">{activity.text}</p>
                      </Col>
                      <Col xs={3} className="text-end text-muted small">
                        {activity.time}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <div className="text-center mt-4">
                <Button variant="outline-primary" as={Link} to="/prescription-history">
                  Puri History Dekhein
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">
            <span className="border-bottom border-3 border-danger pb-2">Hamare Users Ke Raye</span>
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Image 
                      src="/user1.jpg" 
                      alt="Asif Ali" 
                      roundedCircle 
                      width={60} 
                      height={60} 
                      className="me-3 border border-2 border-primary"
                      loading="lazy"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Asif Ali</h6>
                      <small className="text-muted">Lahore</small>
                    </div>
                  </div>
                  <p className="mb-0">
                    "Mere diabetes ke prescriptions manage karna ab bohat aasan hogaya hai. Reminders ki wajah se medicines bhoolne ka khatam!"
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Image 
                      src="/user2.jpg" 
                      alt="Fatima Khan" 
                      roundedCircle 
                      width={60} 
                      height={60} 
                      className="me-3 border border-2 border-primary"
                      loading="lazy"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Fatima Khan</h6>
                      <small className="text-muted">Karachi</small>
                    </div>
                  </div>
                  <p className="mb-0">
                    "Bachon ki medicines ka record rakhna mushkil tha. Ab sab kuch mobile pe hai aur reminders bhi milte hain."
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Image 
                      src="/user3.jpg" 
                      alt="Dr. Usman Ahmed" 
                      roundedCircle 
                      width={60} 
                      height={60} 
                      className="me-3 border border-2 border-primary"
                      loading="lazy"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Dr. Usman Ahmed</h6>
                      <small className="text-muted">Islamabad</small>
                    </div>
                  </div>
                  <p className="mb-0">
                    "As a doctor, I recommend RxEaseAI to my patients. It helps them follow prescriptions correctly."
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">
            <span className="border-bottom border-3 border-primary pb-2">Aksar Puchey Jane Wale Sawalat</span>
          </h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()} className="mb-3 border-0 shadow-sm">
                    <Accordion.Header>
                      <FaQuestionCircle className="text-primary me-2" />
                      {faq.question}
                    </Accordion.Header>
                    <Accordion.Body>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-4">Tayyar Hain Apna Prescription Digital Banane Ke Liye?</h2>
          <p className="lead mb-5">Abhi Register Karein aur apni sehat ka digital record shuru karein</p>
          <Button 
            variant="light" 
            size="lg" 
            className="rounded-pill px-5 fw-bold text-primary mb-3"
            as={Link} 
            to="/signup"
          >
            Free Mein Register Karein
          </Button>
          <p className="small mb-0">No credit card required. 100% free for Pakistani users.</p>
        </Container>
      </section>

      <AppFooter />

      {/* CSS for the component */}
      <style jsx>{`
        .home-page {
          overflow-x: hidden;
        }
        .hero-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .hover-effect {
          transition: all 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .step-number {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .cta-section {
          background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
        }
        .trusted-section {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;