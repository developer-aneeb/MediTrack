import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:1000/api';

export const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch all prescriptions for the current user
  const fetchPrescriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/prescriptions`, {
        headers: getAuthHeader()
      });
      setPrescriptions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch prescriptions');
      console.error('Error fetching prescriptions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new prescription
  const addPrescription = useCallback(async (prescriptionData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate the prescription data
      if (!prescriptionData.patientName || !prescriptionData.doctorName || !prescriptionData.date || 
          !prescriptionData.medicationName || !prescriptionData.dosage || !prescriptionData.instructions) {
        throw new Error('All required fields must be filled out');
      }

      // Ensure the date is in the correct format
      const date = new Date(prescriptionData.date);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }

      const response = await axios.post(`${API_URL}/prescriptions`, prescriptionData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setPrescriptions(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add prescription';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit an existing prescription
  const editPrescription = useCallback(async (prescriptionId, prescriptionData) => {
    try {
      setLoading(true);
      setError(null);

      // Validate the prescription data
      if (!prescriptionData.patientName || !prescriptionData.doctorName || !prescriptionData.date || 
          !prescriptionData.medicationName || !prescriptionData.dosage || !prescriptionData.instructions) {
        throw new Error('All required fields must be filled out');
      }

      // Ensure the date is in the correct format
      const date = new Date(prescriptionData.date);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }

      // Log the data being sent
      console.log('Sending edit request:', {
        id: prescriptionId,
        data: prescriptionData
      });

      const response = await axios.put(`${API_URL}/prescriptions/${prescriptionId}`, prescriptionData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Update the prescriptions list with the edited prescription
      setPrescriptions(prev => prev.map(p => 
        p._id === prescriptionId ? { ...response.data } : p
      ));

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update prescription';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a prescription
  const deletePrescription = useCallback(async (prescriptionId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_URL}/prescriptions/${prescriptionId}`, {
        headers: getAuthHeader()
      });
      setPrescriptions(prev => prev.filter(p => p._id !== prescriptionId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete prescription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Share prescription via email
  const sharePrescription = useCallback(async (prescriptionId, recipientEmail) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${API_URL}/prescriptions/${prescriptionId}/share`,
        { recipientEmail },
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share prescription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch prescriptions on component mount
  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  return {
    prescriptions,
    error,
    loading,
    addPrescription,
    editPrescription,
    deletePrescription,
    sharePrescription,
    refreshPrescriptions: fetchPrescriptions
  };
}; 