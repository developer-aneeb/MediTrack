import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form, Tab, Tabs, Alert, Card } from 'react-bootstrap';
import { FaUserCircle, FaEdit, FaSave, FaCamera, FaPhone, FaMapMarkerAlt, FaNotesMedical, FaAllergies, FaUserShield } from 'react-icons/fa';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';
import ProfileFormField from '../components/ProfileFormField';
import useProfile from '../hooks/useProfile';

const Profile = () => {
  const { profile: initialProfile, loading, error, updateProfile, uploadProfileImage } = useProfile();
  const [profile, setProfile] = useState(initialProfile || {});
  const [isEditing, setIsEditing] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Update local profile state when initialProfile changes
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowSuccess(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(profile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const result = await uploadProfileImage(file);
        setProfile(prev => ({
          ...prev,
          profileImage: result.profileImage
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Pakistani provinces for dropdown
  const pakistaniProvinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Jammu & Kashmir',
    'Islamabad Capital Territory'
  ];

  if (loading) {
    return (
      <div className="profile-page">
        <AppNavbar />
        <Container className="my-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <AppNavbar />
      <Container className="my-5">
        <h1 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: 'bold' }}>My Health Profile</h1>
        
        {error && (
          <Alert variant="danger" className="text-center" dismissible>
            {error}
          </Alert>
        )}
        
        {showSuccess && (
          <Alert variant="success" className="text-center" dismissible onClose={() => setShowSuccess(false)}>
            <strong>Profile Updated!</strong> Your information has been saved successfully.
          </Alert>
        )}

        <Row className="justify-content-center">
          <Col xl={10} lg={10} md={12}>
            <Card className="profile-card shadow-lg border-0">
              <Card.Body className="p-4">
                <Row className="align-items-start">
                  {/* Left Profile Column */}
                  <Col lg={4} md={5} className="text-center mb-4 mb-md-0">
                    <div className="profile-picture-container position-relative d-inline-block mb-3">
                      <Image 
                        src={profile?.profileImage || '/Profile.jpeg'} 
                        alt="Profile" 
                        roundedCircle 
                        fluid 
                        className="profile-image shadow"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = '/Profile.jpeg'
                        }}
                      />
                      {isEditing && (
                        <>
                          <Button 
                            variant="light" 
                            className="change-photo-btn position-absolute rounded-circle shadow-sm"
                            onClick={triggerFileInput}
                            title="Change profile picture"
                            disabled={loading}
                          >
                            <FaCamera className="text-primary" />
                          </Button>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                        </>
                      )}
                    </div>
                    
                    <h3 className="profile-name mt-3">{profile?.name || 'Your Name'}</h3>
                    <p className="text-muted profile-email">
                      <FaUserCircle className="me-2" />
                      {profile?.email || 'your@email.com'}
                    </p>
                    <p className="text-muted profile-phone">
                      <FaPhone className="me-2" />
                      {profile?.phone || '0300-1234567'}
                    </p>
                    
                    {profile?.address && (
                      <p className="text-muted">
                        <FaMapMarkerAlt className="me-2" />
                        {profile.address}
                      </p>
                    )}

                    <div className="d-flex justify-content-center gap-3 mt-4">
                      {!isEditing ? (
                        <Button 
                          variant="outline-primary" 
                          onClick={handleEditClick}
                          className="edit-btn flex-grow-1"
                          disabled={loading}
                        >
                          <FaEdit className="me-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <Button 
                          variant="primary" 
                          type="submit" 
                          form="profileForm"
                          className="save-btn flex-grow-1"
                          disabled={loading}
                        >
                          <FaSave className="me-2" />
                          {loading ? 'Saving...' : 'Save Profile'}
                        </Button>
                      )}
                    </div>
                  </Col>
                  
                  {/* Right Information Column */}
                  <Col lg={8} md={7}>
                    <Tabs defaultActiveKey="personal-info" id="profile-tabs" className="profile-tabs mb-3">
                      {/* Personal Information Tab */}
                      <Tab eventKey="personal-info" title="Personal Info" className="p-3">
                        <Form id="profileForm" onSubmit={handleSaveClick}>
                          <Row>
                            <Col md={6}>
                              <ProfileFormField
                                label="Full Name"
                                name="name"
                                value={profile?.name || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                required
                                icon={<FaUserCircle />}
                                disabled={loading}
                              />
                            </Col>
                            <Col md={6}>
                              <ProfileFormField
                                label="Email"
                                name="email"
                                value={profile?.email || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                type="email"
                                required
                                disabled={loading}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <ProfileFormField
                                label="Phone Number"
                                name="phone"
                                value={profile?.phone || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                type="tel"
                                placeholder="0300-1234567"
                                icon={<FaPhone />}
                                disabled={loading}
                              />
                            </Col>
                            <Col md={6}>
                              <ProfileFormField
                                label="CNIC"
                                name="cnic"
                                value={profile?.cnic || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                placeholder="XXXXX-XXXXXXX-X"
                                disabled={loading}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <ProfileFormField
                                label="Age"
                                name="age"
                                value={profile?.age || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                type="number"
                                disabled={loading}
                              />
                            </Col>
                            <Col md={4}>
                              <ProfileFormField
                                label="Gender"
                                name="gender"
                                value={profile?.gender || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                as="select"
                                options={[
                                  { value: '', label: 'Select Gender' },
                                  { value: 'Male', label: 'Male' },
                                  { value: 'Female', label: 'Female' },
                                  { value: 'Other', label: 'Other' },
                                ]}
                                disabled={loading}
                              />
                            </Col>
                            <Col md={4}>
                              <ProfileFormField
                                label="Blood Group"
                                name="bloodGroup"
                                value={profile?.bloodGroup || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                as="select"
                                options={[
                                  { value: '', label: 'Select Blood Group' },
                                  { value: 'A+', label: 'A+' },
                                  { value: 'A-', label: 'A-' },
                                  { value: 'B+', label: 'B+' },
                                  { value: 'B-', label: 'B-' },
                                  { value: 'AB+', label: 'AB+' },
                                  { value: 'AB-', label: 'AB-' },
                                  { value: 'O+', label: 'O+' },
                                  { value: 'O-', label: 'O-' },
                                ]}
                                disabled={loading}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <ProfileFormField
                                label="Height (cm)"
                                name="height"
                                value={profile?.height || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                placeholder="e.g. 170"
                                disabled={loading}
                              />
                            </Col>
                            <Col md={6}>
                              <ProfileFormField
                                label="Weight (kg)"
                                name="weight"
                                value={profile?.weight || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                placeholder="e.g. 70"
                                disabled={loading}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <ProfileFormField
                                label="City"
                                name="city"
                                value={profile?.city || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                disabled={loading}
                              />
                            </Col>
                            <Col md={6}>
                              <ProfileFormField
                                label="Province"
                                name="province"
                                value={profile?.province || ''}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                as="select"
                                options={[
                                  { value: '', label: 'Select Province' },
                                  ...pakistaniProvinces.map(province => ({
                                    value: province,
                                    label: province
                                  }))
                                ]}
                                disabled={loading}
                              />
                            </Col>
                          </Row>

                          <ProfileFormField
                            label="Full Address"
                            name="address"
                            value={profile?.address || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={2}
                            icon={<FaMapMarkerAlt />}
                            placeholder="House #, Street, Area, City"
                            disabled={loading}
                          />
                        </Form>
                      </Tab>

                      {/* Medical History Tab */}
                      <Tab eventKey="medical-history" title={
                        <>
                          <FaNotesMedical className="me-2" />
                          Medical History
                        </>
                      } className="p-3">
                        <Form>
                          <ProfileFormField
                            label="Medical Conditions"
                            name="medicalConditions"
                            value={profile?.medicalConditions || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={3}
                            placeholder="e.g. Diabetes, Hypertension, Asthma"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Current Medications"
                            name="currentMedications"
                            value={profile?.currentMedications || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={3}
                            placeholder="List all medications you're currently taking"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Past Surgeries"
                            name="pastSurgeries"
                            value={profile?.pastSurgeries || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={3}
                            placeholder="Any past surgeries with dates if possible"
                            disabled={loading}
                          />
                        </Form>
                      </Tab>

                      {/* Allergies Tab */}
                      <Tab eventKey="allergies" title={
                        <>
                          <FaAllergies className="me-2" />
                          Allergies
                        </>
                      } className="p-3">
                        <Form>
                          <ProfileFormField
                            label="Food Allergies"
                            name="foodAllergies"
                            value={profile?.foodAllergies || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={2}
                            placeholder="e.g. Peanuts, Shellfish, Eggs"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Drug Allergies"
                            name="drugAllergies"
                            value={profile?.drugAllergies || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={2}
                            placeholder="e.g. Penicillin, Sulfa drugs"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Other Allergies"
                            name="otherAllergies"
                            value={profile?.otherAllergies || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            as="textarea"
                            rows={2}
                            placeholder="e.g. Latex, Pollen, Dust mites"
                            disabled={loading}
                          />
                        </Form>
                      </Tab>

                      {/* Emergency Contacts Tab */}
                      <Tab eventKey="emergency-contacts" title={
                        <>
                          <FaUserShield className="me-2" />
                          Emergency Contacts
                        </>
                      } className="p-3">
                        <Form>
                          <ProfileFormField
                            label="Contact Name"
                            name="emergencyContactName"
                            value={profile?.emergencyContactName || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            placeholder="Full name of emergency contact"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Relationship"
                            name="emergencyContactRelationship"
                            value={profile?.emergencyContactRelationship || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            placeholder="e.g. Father, Mother, Spouse"
                            disabled={loading}
                          />
                          <ProfileFormField
                            label="Phone Number"
                            name="emergencyContactPhone"
                            value={profile?.emergencyContactPhone || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            type="tel"
                            placeholder="0300-1234567"
                            disabled={loading}
                          />
                        </Form>
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AppFooter />

      <style jsx>{`
        .profile-page {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        .profile-card {
          border-radius: 15px;
          overflow: hidden;
        }
        .profile-picture-container {
          position: relative;
        }
        .profile-image {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border: 4px solid #fff;
        }
        .change-photo-btn {
          bottom: 15px;
          right: 15px;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white !important;
          border: 2px solid #dee2e6;
        }
        .change-photo-btn:hover {
          background-color: #f8f9fa !important;
          border-color: #adb5bd;
        }
        .profile-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
        .profile-email, .profile-phone {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }
        .edit-btn, .save-btn {
          min-width: 180px;
          padding: 10px 20px;
          font-weight: 500;
          border-radius: 50px;
        }
        .profile-tabs .nav-link {
          font-weight: 500;
          color: #495057;
          padding: 12px 20px;
        }
        .profile-tabs .nav-link.active {
          color: #0d6efd;
          font-weight: 600;
          background-color: rgba(13, 110, 253, 0.1);
          border-bottom: 3px solid #0d6efd;
        }
        @media (max-width: 991.98px) {
          .profile-image {
            width: 160px;
            height: 160px;
          }
        }
        @media (max-width: 767.98px) {
          .profile-image {
            width: 140px;
            height: 140px;
          }
          .edit-btn, .save-btn {
            min-width: 140px;
            padding: 8px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;