import React, { useState } from 'react';
import { Container, Button, Card, Row, Col, Modal, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaUserMd, FaCalendarAlt, FaPills, FaNotesMedical, FaExclamationTriangle } from 'react-icons/fa';
import PrescriptionForm from '../components/PrescriptionForm';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';
import { usePrescriptions } from '../hooks/usePrescriptions';

const PrescriptionEntry = () => {
  const { prescriptions, loading, error: apiError, addPrescription, editPrescription, deletePrescription } = usePrescriptions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleAddPrescription = async (newPrescription) => {
    try {
      // Log the prescription data being sent
      console.log('Adding prescription:', newPrescription);
      
      // Validate the prescription data before sending
      const requiredFields = ['patientName', 'doctorName', 'date', 'medicationName', 'dosage', 'instructions'];
      const missingFields = requiredFields.filter(field => !newPrescription[field] || newPrescription[field].trim() === '');
      
      if (missingFields.length > 0) {
        const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
        console.error(errorMsg);
        setFormError(errorMsg);
        return;
      }

      await addPrescription(newPrescription);
    setShowAddModal(false);
    setShowSuccess(true);
      setFormError(null);
    setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding prescription:', error);
      setFormError(error.message || 'Failed to add prescription. Please try again.');
    }
  };

  const handleEditPrescription = async (updatedPrescription) => {
    try {
      // Log the prescription data being edited
      console.log('Editing prescription:', updatedPrescription);
      
      // Validate the prescription data before sending
      const requiredFields = ['patientName', 'doctorName', 'date', 'medicationName', 'dosage', 'instructions'];
      const missingFields = requiredFields.filter(field => !updatedPrescription[field] || updatedPrescription[field].trim() === '');
      
      if (missingFields.length > 0) {
        const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
        console.error(errorMsg);
        setFormError(errorMsg);
        return;
      }

      await editPrescription(updatedPrescription._id, updatedPrescription);
    setShowEditModal(false);
    setCurrentPrescription(null);
    setShowSuccess(true);
      setFormError(null);
    setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error editing prescription:', error);
      setFormError(error.message || 'Failed to edit prescription. Please try again.');
    }
  };

  const handleDeletePrescription = async (id) => {
    try {
      await deletePrescription(id);
    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 3000);
    } catch (error) {
      console.error('Error deleting prescription:', error);
    }
  };

  const openEditModal = (prescription) => {
    setCurrentPrescription(prescription);
    setShowEditModal(true);
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

  return (
    <>
      <AppNavbar />
      <Container className="my-4 prescription-page">
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#2c3e50' }}>Manage Your Prescriptions</h2>
        
        {formError && (
          <Alert variant="danger" className="text-center" dismissible>
            {formError}
          </Alert>
        )}
        
        {showSuccess && (
          <Alert variant="success" className="text-center" dismissible onClose={() => setShowSuccess(false)}>
            Prescription updated successfully!
          </Alert>
        )}
        
        {showDeleteAlert && (
          <Alert variant="danger" className="text-center" dismissible onClose={() => setShowDeleteAlert(false)}>
            Prescription deleted successfully!
          </Alert>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Your Prescription Records</h5>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
            className="add-btn"
            disabled={loading}
          >
            <FaPlus className="me-2" />
            {loading ? 'Loading...' : 'Add New Prescription'}
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : prescriptions.length === 0 ? (
          <Card className="text-center py-5 shadow-sm">
            <Card.Body>
              <FaPills size={48} className="text-muted mb-3" />
              <h5 className="text-muted">No prescriptions found</h5>
              <p>Add your first prescription to get started</p>
              <Button 
                variant="outline-primary" 
                onClick={() => setShowAddModal(true)}
              >
                Add Prescription
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {prescriptions.map((p) => (
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
                    
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => openEditModal(p)}
                        className="edit-btn"
                        disabled={loading}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDeletePrescription(p._id)}
                        className="delete-btn"
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add Prescription Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Add New Prescription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PrescriptionForm 
              onSubmit={handleAddPrescription} 
              onCancel={() => setShowAddModal(false)} 
            />
          </Modal.Body>
        </Modal>

        {/* Edit Prescription Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Edit Prescription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentPrescription && (
              <PrescriptionForm
                initialData={currentPrescription}
                onSubmit={handleEditPrescription}
                onCancel={() => setShowEditModal(false)}
              />
            )}
          </Modal.Body>
        </Modal>
      </Container>
      <AppFooter />

      <style jsx>{`
        .prescription-page {
          max-width: 1200px;
        }
        .add-btn {
          border-radius: 50px;
          padding: 8px 20px;
          font-weight: 500;
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
        .edit-btn, .delete-btn {
          min-width: 80px;
          border-radius: 50px;
        }
        @media (max-width: 767.98px) {
          .prescription-page {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default PrescriptionEntry;