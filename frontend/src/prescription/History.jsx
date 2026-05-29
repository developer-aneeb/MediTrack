import React, { useState, useMemo } from 'react';
import { Container, Card, Row, Col, Button, Modal, Badge, Alert, Form } from 'react-bootstrap';
import { FaShare, FaUserMd, FaCalendarAlt, FaPills, FaNotesMedical, FaExclamationTriangle, FaUser, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
// import { sharePrescriptionByEmail } from './Share';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';
import { usePrescriptions } from '../hooks/usePrescriptions';

const PrescriptionHistory = () => {
  const { prescriptions, loading, error, sharePrescription } = usePrescriptions();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [shareStatus, setShareStatus] = useState({ type: '', message: '' });
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique doctor names for filter dropdown
  const doctorNames = useMemo(() => 
    [...new Set(prescriptions.map(p => p.doctorName))].filter(Boolean),
    [prescriptions]
  );

  const handleSharePrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowShareModal(true);
    setShareStatus({ type: '', message: '' });
    setRecipientEmail("");
  };

  const handleSendShare = async () => {
    if (!recipientEmail.includes('@') || !recipientEmail.includes('.')) {
      setShareStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setShareStatus({ type: 'info', message: 'Sending prescription...' });
    try {
      await sharePrescription(selectedPrescription._id, recipientEmail);
      setShareStatus({ type: 'success', message: 'Prescription shared successfully!' });
      setTimeout(() => setShowShareModal(false), 2000);
    } catch (error) {
      setShareStatus({ type: 'error', message: 'Failed to share prescription. Please try again.' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '[No Date]';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter prescriptions based on selected filters and search term
  const filteredPrescriptions = useMemo(() => 
    prescriptions.filter(p => {
    const matchesDate = !filterDate || p.date?.includes(filterDate);
    const matchesDoctor = !filterDoctor || p.doctorName?.toLowerCase().includes(filterDoctor.toLowerCase());
    const matchesSearch = !searchTerm || 
      p.medicationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesDoctor && matchesSearch;
    }),
    [prescriptions, filterDate, filterDoctor, searchTerm]
  );

  const clearFilters = () => {
    setFilterDate("");
    setFilterDoctor("");
    setSearchTerm("");
  };

  const hasActiveFilters = filterDate || filterDoctor || searchTerm;

  return (
    <>
      <AppNavbar />
      <Container className="my-4 prescription-history">
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#2c3e50' }}>Your Prescription History</h2>

        {error && (
          <Alert variant="danger" className="text-center" dismissible>
            {error}
          </Alert>
        )}

        {/* Search and Filter Section */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="position-relative" style={{ width: '300px' }}>
              <Form.Control
                type="text"
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ps-4"
                disabled={loading}
              />
              <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
              {searchTerm && (
                <Button
                  variant="link"
                  className="position-absolute top-50 end-0 translate-middle-y p-0 me-2"
                  onClick={() => setSearchTerm("")}
                  disabled={loading}
                >
                  <FaTimes className="text-muted" />
                </Button>
              )}
            </div>
            <Button 
              variant={showFilters ? 'primary' : 'outline-primary'} 
              onClick={() => setShowFilters(!showFilters)}
              className="d-flex align-items-center"
              disabled={loading}
            >
              <FaFilter className="me-2" />
              {showFilters ? 'Hide Filters' : 'Filter'}
            </Button>
          </div>

          {showFilters && (
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="filterDate" className="mb-3">
                      <Form.Label>Filter by Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="filterDoctor" className="mb-3">
                      <Form.Label>Filter by Doctor</Form.Label>
                      <Form.Control
                        as="select"
                        value={filterDoctor}
                        onChange={(e) => setFilterDoctor(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">All Doctors</option>
                        {doctorNames.map((doctor, index) => (
                          <option key={index} value={doctor}>{doctor}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {hasActiveFilters && (
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="small text-muted">
                      Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions
                    </div>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={clearFilters}
                      disabled={loading}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Share Modal */}
        <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Share Prescription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPrescription && (
              <div className="prescription-summary mb-3">
                <h5 className="text-primary mb-3">{selectedPrescription.medicationName || 'No Medication'}</h5>
                <div className="d-flex align-items-center mb-2">
                  <FaUserMd className="me-2 text-primary" />
                  <span><strong>Doctor:</strong> {selectedPrescription.doctorName || 'Not specified'}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaCalendarAlt className="me-2 text-primary" />
                  <span><strong>Date:</strong> {formatDate(selectedPrescription.date)}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaUser className="me-2 text-primary" />
                  <span><strong>Patient:</strong> {selectedPrescription.patientName || 'Not specified'}</span>
                </div>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="recipientEmail" className="form-label">Recipient's Email</label>
              <input
                id="recipientEmail"
                type="email"
                className="form-control"
                placeholder="example@domain.com"
                value={recipientEmail}
                onChange={e => setRecipientEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button 
              variant="primary" 
              onClick={handleSendShare} 
              disabled={!recipientEmail || shareStatus.type === 'info' || loading}
              className="w-100 py-2"
            >
              <FaShare className="me-2" />
              {shareStatus.type === 'info' ? 'Sending...' : 'Send Prescription'}
            </Button>
            {shareStatus.message && (
              <Alert variant={shareStatus.type || 'info'} className="mt-3 text-center">
                {shareStatus.message}
              </Alert>
            )}
          </Modal.Body>
        </Modal>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <Card className="text-center py-5 shadow-sm empty-state">
            <Card.Body>
              <FaPills size={48} className="text-muted mb-3" />
              <h5 className="text-muted">
                {prescriptions.length === 0 ? 'No prescriptions found' : 'No matching prescriptions'}
              </h5>
              <p>
                {prescriptions.length === 0 
                  ? 'You haven\'t added any prescriptions yet' 
                  : 'Try adjusting your search or filters'}
              </p>
              <div className="d-flex justify-content-center">
                {prescriptions.length === 0 && (
                  <Button 
                    variant="outline-primary" 
                    link="/prescription-entry"
                    className="me-2"
                  >
                    Add Your First Prescription
                  </Button>
                )}
                {hasActiveFilters && (
                  <Button 
                    variant="outline-secondary" 
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ) : (
          <>
            {hasActiveFilters && (
              <div className="mb-3 text-muted">
                Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions
              </div>
            )}
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredPrescriptions.map((p) => (
                <Col key={p._id}>
                  <Card className="h-100 shadow-sm prescription-card">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Badge bg="info" className="mb-2">
                          {p.medicationName}
                        </Badge>
                        <small className="text-muted">{formatDate(p.date)}</small>
                      </div>
                      
                      <div className="prescription-detail mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaUserMd className="me-2 text-primary" />
                          <span><strong>Doctor:</strong> {p.doctorName}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <FaPills className="me-2 text-primary" />
                          <span><strong>Dosage:</strong> {p.dosage}</span>
                        </div>
                        <div className="d-flex align-items-start mb-2">
                          <FaNotesMedical className="me-2 text-primary mt-1" />
                          <span><strong>Instructions:</strong> {p.instructions}</span>
                        </div>
                        <div className="d-flex align-items-start">
                          <FaExclamationTriangle className="me-2 text-primary mt-1" />
                          <span><strong>Side Effects:</strong> {p.sideEffects}</span>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-end">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          onClick={() => handleSharePrescription(p)}
                          className="share-btn"
                          disabled={loading}
                        >
                          <FaShare className="me-2" />
                          Share
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <AppFooter />

      <style jsx>{`
        .prescription-history {
          max-width: 1200px;
        }
        .prescription-card {
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .prescription-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .prescription-detail {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
        }
        .share-btn {
          min-width: 100px;
          border-radius: 50px;
        }
        .empty-state {
          border-radius: 10px;
          border: 2px dashed #dee2e6;
          background-color: #f8f9fa;
        }
        @media (max-width: 767.98px) {
          .prescription-history {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default PrescriptionHistory;