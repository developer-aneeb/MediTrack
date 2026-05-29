// src/components/Search.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Tab, Tabs, Alert, Row, Col, Image, Badge } from 'react-bootstrap';
import AppNavbar from '../components/common/Navbar';
import AppFooter from '../components/common/Footer';
import { medicineData } from './medicines'; // Local medicine data

const Search = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchType, setSearchType] = useState('brand'); // 'brand', 'generic', 'symptoms'

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      // First try to find in local medicine data
      const found = medicineData.find(med => 
        med.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        med.generic_name.toLowerCase().includes(query.trim().toLowerCase()) ||
        med.brand_names.toLowerCase().includes(query.trim().toLowerCase()) ||
        med.diseases_treated.toLowerCase().includes(query.trim().toLowerCase())
      );

      if (found) {
        setResult(found);
      } else {
        // If not found in local data, try CSV file
        try {
          const res = await fetch('/medicine.csv');
          if (res.ok) {
            const text = await res.text();
            const csvData = parseCSV(text);
            const csvFound = csvData.find(med => 
              med.name.toLowerCase().includes(query.trim().toLowerCase()) ||
              med.generic_name.toLowerCase().includes(query.trim().toLowerCase()) ||
              med.brand_names.toLowerCase().includes(query.trim().toLowerCase()) ||
              med.diseases_treated.toLowerCase().includes(query.trim().toLowerCase())
            );
            
            if (csvFound) {
              setResult(csvFound);
            } else {
              setNotFound(true);
            }
          } else {
            setNotFound(true);
          }
        } catch (err) {
          console.error('Error loading CSV:', err);
        setNotFound(true);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // CSV parsing function
  const parseCSV = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ? values[i].trim() : '';
      });
      return obj;
    });
  };

  return (
    <>
      <AppNavbar />
      <Container className="my-4" style={{ maxWidth: 1000 }}>
        <h1 className="text-center mb-4" style={{ color: '#2c3e50' }}>RxEaseAI Medicine Search</h1>
        <p className="text-center mb-4 text-muted">
          Search for medicine by name, generic name, or symptoms. Get complete information about medicines commonly used in Pakistan.
        </p>

        <div className="d-flex justify-content-center mb-4">
          <Button 
            variant={searchType === 'brand' ? 'primary' : 'outline-primary'} 
            className="me-2"
            onClick={() => setSearchType('brand')}
          >
            Brand
          </Button>
          <Button 
            variant={searchType === 'generic' ? 'primary' : 'outline-primary'} 
            className="me-2"
            onClick={() => setSearchType('generic')}
          >
            Generic
          </Button>
          <Button 
            variant={searchType === 'symptoms' ? 'primary' : 'outline-primary'}
            onClick={() => setSearchType('symptoms')}
          >
            Symptoms
          </Button>
        </div>

        <Form onSubmit={handleSearch} className="mb-5">
          <Form.Group controlId="searchForm" className="position-relative">
          <Form.Control
            type="text"
              placeholder={
                searchType === 'brand' ? 'Search by brand name (e.g. Panadol)' :
                searchType === 'generic' ? 'Search by generic name (e.g. Paracetamol)' :
                'Search by symptoms (e.g. headache, fever)'
              }
            value={query}
            onChange={e => setQuery(e.target.value)}
              className="py-3 px-4"
              style={{ borderRadius: '50px', fontSize: '1.1rem' }}
            required
          />
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="position-absolute end-0 top-0 h-100"
              style={{ 
                borderRadius: '0 50px 50px 0',
                padding: '0 25px',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
            >
            {loading ? 'Searching...' : 'Search'}
          </Button>
          </Form.Group>
        </Form>

        {notFound && (
          <Alert variant="warning" className="text-center">
            <strong>No medicine found!</strong> We don't have information about "{query}" in our database.
            <div className="mt-2">Try searching with different names or check spelling.</div>
          </Alert>
        )}

        {result && (
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white py-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2 className="mb-0">{result.name} <small>({result.generic_name})</small></h2>
                  <div className="text-white-50">{result.company}</div>
                </Col>
                <Col md={4} className="text-end">
                  {result.popular_in_pakistan && (
                    <Badge bg="success" className="me-2">Popular in Pakistan</Badge>
                  )}
                  {result.is_prescription ? (
                    <Badge bg="danger">Prescription Required</Badge>
                  ) : (
                    <Badge bg="success">Over-the-Counter</Badge>
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center mb-4 mb-md-0">
                  <Image 
                    src={result.image || 'https://via.placeholder.com/300x200?text=Medicine+Image'} 
                    alt={result.name} 
                    fluid 
                    rounded 
                    className="border"
                    style={{ maxHeight: 250 }}
                  />
                  <div className="mt-3">
                    <h5 className="text-success">
                      {result.price_after} <small className="text-decoration-line-through text-muted">{result.price_before}</small>
                    </h5>
                    {result.discount > 0 && (
                      <Badge bg="danger" className="ms-2">{result.discount}% OFF</Badge>
                    )}
                  </div>
                  <div className="text-muted small">{result.pack_size}</div>
                  <div className={`mt-2 fw-bold ${result.availability.includes('Available') ? 'text-success' : 'text-danger'}`}>
                    {result.availability}
                  </div>
                </Col>
                <Col md={8}>
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="overview" title="Overview">
                      <h5 className="mt-3">What is {result.name}?</h5>
                      <p>{result.description}</p>
                      
                      <h5 className="mt-4">Primary Uses</h5>
                      <ul>
                        {result.primary_uses.split(',').map((use, i) => (
                          <li key={i}>{use.trim()}</li>
                        ))}
                      </ul>

                      <h5 className="mt-4">Diseases Treated</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {result.diseases_treated.split(',').map((disease, i) => (
                          <Badge key={i} bg="info" pill>{disease.trim()}</Badge>
                        ))}
                      </div>

                      <h5 className="mt-4">Brand Names in Pakistan</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {result.brand_names.split(',').map((brand, i) => (
                          <Badge key={i} bg="secondary" pill>{brand.trim()}</Badge>
                        ))}
                      </div>
                    </Tab>
                    <Tab eventKey="dosage" title="Dosage">
                      <h5 className="mt-3">Recommended Dosage</h5>
                      <p>{result.dosage}</p>
                      
                      <div className="alert alert-warning mt-4">
                        <strong>Important:</strong> Always follow your doctor's instructions or the directions on the label. 
                        Do not take more than the recommended dose.
                      </div>
                    </Tab>
                    <Tab eventKey="side-effects" title="Side Effects">
                      <h5 className="mt-3">Possible Side Effects</h5>
                      <p>{result.side_effects}</p>
                      
                      <div className="alert alert-danger mt-4">
                        <strong>Seek medical help immediately</strong> if you experience severe allergic reactions, 
                        difficulty breathing, or swelling of face/lips/tongue.
                      </div>
                    </Tab>
                    <Tab eventKey="interactions" title="Interactions">
                      <h5 className="mt-3">Drug Interactions</h5>
                      <p>{result.interactions || 'No significant interactions reported.'}</p>
                      
                      <div className="alert alert-info mt-4">
                        <strong>Note:</strong> Always inform your doctor about all medicines you're taking, 
                        including herbal supplements and over-the-counter drugs.
                      </div>
                    </Tab>
                    <Tab eventKey="storage" title="Storage">
                      <h5 className="mt-3">Storage Instructions</h5>
                      <p>{result.storage}</p>
                      
                      <div className="alert alert-secondary mt-4">
                        <strong>Safety Tip:</strong> Keep all medicines out of reach of children and pets.
                      </div>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {!result && !notFound && (
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h5 className="text-muted">Search for common Pakistani medicines like:</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <Badge pill bg="light" text="dark" className="px-3 py-2">Panadol</Badge>
                <Badge pill bg="light" text="dark" className="px-3 py-2">Brufen</Badge>
                <Badge pill bg="light" text="dark" className="px-3 py-2">Augmentin</Badge>
                <Badge pill bg="light" text="dark" className="px-3 py-2">Risek</Badge>
                <Badge pill bg="light" text="dark" className="px-3 py-2">Arinac</Badge>
                <Badge pill bg="light" text="dark" className="px-3 py-2">Flagyl</Badge>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
      <AppFooter />
    </>
  );
};

export default Search; 