// src/components/Reminders.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Modal, Form, Badge, Alert } from 'react-bootstrap';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';
import { useReminders } from '../hooks/useReminders';

const getTimeOfDay = (time) => {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

const Reminders = () => {
  const { 
    reminders, 
    error, 
    loading, 
    addReminder, 
    editReminder, 
    deleteReminder, 
    markAsTaken 
  } = useReminders();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [form, setForm] = useState({
    medication: '',
    dosage: '',
    time: '',
    date: '',
    notes: '',
  });
  const [stats, setStats] = useState(null);

  // Update analytics
  useEffect(() => {
    const analyzeReminders = (reminders) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const stats = {
        total: reminders.length,
        taken: reminders.filter(r => r.status === 'taken').length,
        missed: reminders.filter(r => {
          const reminderDate = new Date(r.date);
          return r.status === 'missed' || 
                 (reminderDate < today && !r.status);
        }).length,
        upcoming: reminders.filter(r => {
          const reminderDate = new Date(r.date);
          return reminderDate >= today && !r.status;
        }).length,
      };

      return stats;
    };

    setStats(analyzeReminders(reminders));
  }, [reminders]);

  const openAddModal = () => {
    setEditMode(false);
    setForm({ 
      medication: '', 
      dosage: '', 
      time: '', 
      date: new Date().toISOString().split('T')[0], 
      notes: '' 
    });
    setShowModal(true);
  };

  const openEditModal = (reminder) => {
    setEditMode(true);
    setCurrentReminder(reminder);
    setForm({
      medication: reminder.medication,
      dosage: reminder.dosage,
      time: reminder.time,
      date: new Date(reminder.date).toISOString().split('T')[0],
      notes: reminder.notes || '',
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
    if (editMode) {
        await editReminder({ ...currentReminder, ...form });
    } else {
        await addReminder({ ...form, status: 'pending' });
    }
    setShowModal(false);
    } catch (err) {
      // Error is handled by the useReminders hook
      console.error('Failed to save reminder:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
    } catch (err) {
      // Error is handled by the useReminders hook
      console.error('Failed to delete reminder:', err);
    }
  };

  const handleMarkAsTaken = async (reminder) => {
    try {
      await markAsTaken(reminder._id);
    } catch (err) {
      // Error is handled by the useReminders hook
      console.error('Failed to mark reminder as taken:', err);
    }
  };

  // Group reminders by time of day
  const grouped = reminders.reduce((acc, r) => {
    const tod = getTimeOfDay(r.time);
    if (!acc[tod]) acc[tod] = [];
    acc[tod].push(r);
    return acc;
  }, {});

  // Calendar dates (15 days)
  const today = new Date();
  const days = Array.from({ length: 15 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const selectedDay = today.getDate();

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h2 className="mb-2 fw-bold">Medication Reminders</h2>
        <div className="text-muted mb-3">Never miss a dose with scheduled reminders</div>
        
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        {stats && (
          <div className="d-flex gap-3 mb-3">
            <Badge bg="success">Taken: {stats.taken}</Badge>
            <Badge bg="danger">Missed: {stats.missed}</Badge>
            <Badge bg="info">Upcoming: {stats.upcoming}</Badge>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="bg-white rounded shadow-sm p-3 w-100" style={{ overflowX: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ minWidth: 800 }}>
              {days.map((d, idx) => (
                <div key={idx} className={`text-center ${d.getDate() === selectedDay ? 'fw-bold text-primary' : ''}`}
                  style={{ width: 60 }}>
                  <div>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className={`rounded-circle border ${d.getDate() === selectedDay ? 'bg-primary text-white' : ''}`}
                    style={{ width: 32, height: 32, lineHeight: '32px', margin: '0 auto' }}>
                    {d.getDate()}
                  </div>
                  <div className="small">
                    {reminders.filter(r => {
                      const rd = new Date(r.date);
                      return rd.getDate() === d.getDate() && 
                             rd.getMonth() === d.getMonth() && 
                             rd.getFullYear() === d.getFullYear();
                    }).length}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button 
            variant="primary" 
            className="ms-4" 
            onClick={openAddModal} 
            style={{ minWidth: 140 }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add Reminder'}
          </Button>
        </div>

        <div className="mb-3 fw-bold fs-5">Today's Reminders</div>
        {Object.keys(grouped).length === 0 && <div className="text-muted">No reminders for today.</div>}
        
        {Object.entries(grouped).map(([timeOfDay, items]) => (
          <Card key={timeOfDay} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  width: 6, 
                  height: 40, 
                  background: timeOfDay === 'Morning' ? '#FFA500' : 
                              timeOfDay === 'Afternoon' ? '#007bff' : '#6f42c1',
                  borderRadius: 3, 
                  marginRight: 12 
                }}></div>
                <div className="fw-bold me-3" style={{ minWidth: 90 }}>{timeOfDay}</div>
                <div className="text-muted">{items[0].time}</div>
              </div>
              <div className="d-flex flex-wrap gap-3 mb-2">
                {items.map((r) => (
                  <div key={r._id} className={`rounded p-2 d-flex flex-column align-items-start ${r.status === 'taken' ? 'bg-success bg-opacity-10' : 'bg-light'}`} 
                    style={{ minWidth: 200 }}>
                    <div className="fw-bold">{r.medication}</div>
                    <div className="text-muted" style={{ fontSize: 13 }}>{r.dosage}</div>
                    {r.notes && <div className="small text-muted mt-1">{r.notes}</div>}
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {!r.status && (
                        <Button 
                          size="sm" 
                          variant="success" 
                          onClick={() => handleMarkAsTaken(r)}
                          disabled={loading}
                        >
                          Taken
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline-info" 
                        onClick={() => openEditModal(r)}
                        disabled={loading}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline-danger" 
                        onClick={() => handleDelete(r._id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </div>
                    {r.status === 'taken' && r.takenAt && (
                      <div className="small text-success mt-1">
                        Taken at {new Date(r.takenAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Reminder' : 'Add Reminder'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Medication</Form.Label>
                <Form.Control 
                  name="medication" 
                  value={form.medication} 
                  onChange={handleFormChange} 
                  required 
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dosage</Form.Label>
                <Form.Control 
                  name="dosage" 
                  value={form.dosage} 
                  onChange={handleFormChange} 
                  required 
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control 
                  type="time" 
                  name="time" 
                  value={form.time} 
                  onChange={handleFormChange} 
                  required 
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={form.date} 
                  onChange={handleFormChange} 
                  required 
                  disabled={loading}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  as="textarea" 
                  name="notes" 
                  value={form.notes} 
                  onChange={handleFormChange}
                  disabled={loading}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : (editMode ? 'Save Changes' : 'Add Reminder')}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <AppFooter />
    </>
  );
};

export default Reminders;