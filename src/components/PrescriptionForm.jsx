import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const PrescriptionForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    medicationName: '',
    dosage: '',
    instructions: '',
    patientName: '',
    sideEffects: '',
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // Log initial data for debugging
      console.log('Setting initial data:', initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  // Add a debug effect to monitor form data changes
  useEffect(() => {
    console.log('Current form data:', formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
      ...prevData,
      [name]: value,
      };
      // Log state updates for debugging
      console.log(`Updating ${name}:`, value);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log form data for debugging
    console.log('Form Data:', formData);
    
    // Validate required fields - check for empty strings as well
    const requiredFields = ['patientName', 'doctorName', 'date', 'medicationName', 'dosage', 'instructions'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Format the data
    const formattedData = {
      ...formData,
      date: new Date(formData.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      dosage: formData.dosage.trim(),
      instructions: formData.instructions.trim(),
      sideEffects: formData.sideEffects.trim() || 'None reported'
    };

    // Log formatted data for debugging
    console.log('Formatted Data:', formattedData);

    onSubmit(formattedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="patientName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient's name"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="doctorName">
            <Form.Label>Doctor's Name</Form.Label>
            <Form.Control
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor's name"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="medicationName">
            <Form.Label>Medication Name</Form.Label>
            <Form.Control
              type="text"
              name="medicationName"
              value={formData.medicationName}
              onChange={handleChange}
              placeholder="Enter medication name"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="dosage" className="mb-3">
        <Form.Label>Dosage</Form.Label>
        <Form.Control
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          placeholder="e.g., 1 tablet daily, 5mg"
          required
        />
      </Form.Group>

      <Form.Group controlId="instructions" className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="e.g., Take with food, before sleep"
          required
        />
      </Form.Group>

      <Form.Group controlId="sideEffects" className="mb-3">
        <Form.Label>Side Effects</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="sideEffects"
          value={formData.sideEffects}
          onChange={handleChange}
          placeholder="Enter potential side effects or warnings"
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        {onCancel && (
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          Save Prescription
        </Button>
      </div>
    </Form>
  );
};

export default PrescriptionForm; 