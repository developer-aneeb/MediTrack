import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:1000/api';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get auth token from localStorage
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch all reminders for the current user
  const fetchReminders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/reminders`, {
        headers: getAuthHeader()
      });
      setReminders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reminders');
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new reminder
  const addReminder = useCallback(async (reminderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/reminders`, reminderData, {
        headers: getAuthHeader()
      });
      setReminders(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add reminder');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit an existing reminder
  const editReminder = useCallback(async (reminderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${API_URL}/reminders/${reminderData._id}`, reminderData, {
        headers: getAuthHeader()
      });
      setReminders(prev => prev.map(r => r._id === reminderData._id ? response.data : r));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update reminder');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a reminder
  const deleteReminder = useCallback(async (reminderId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_URL}/reminders/${reminderId}`, {
        headers: getAuthHeader()
      });
      setReminders(prev => prev.filter(r => r._id !== reminderId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete reminder');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark reminder as taken
  const markAsTaken = useCallback(async (reminderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${API_URL}/reminders/${reminderId}/taken`, {}, {
        headers: getAuthHeader()
      });
      setReminders(prev => prev.map(r => r._id === reminderId ? response.data : r));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark reminder as taken');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch reminders on component mount
  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  return {
    reminders,
    error,
    loading,
    addReminder,
    editReminder,
    deleteReminder,
    markAsTaken,
    refreshReminders: fetchReminders
  };
}; 