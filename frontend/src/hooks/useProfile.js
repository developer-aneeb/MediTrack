import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:1000/api';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/profile`, getAuthHeader());
      setProfile(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch profile';
      setError(errorMessage);
      console.error('Error fetching profile:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating profile with data:', profileData);
      
      const response = await axios.put(`${API_URL}/profile`, profileData, {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setProfile(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      console.error('Error updating profile:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (imageFile) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await axios.post(`${API_URL}/profile/image`, formData, {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setProfile(prev => ({
        ...prev,
        profileImage: response.data.profileImage
      }));

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to upload profile image';
      setError(errorMessage);
      console.error('Error uploading profile image:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadProfileImage,
    refreshProfile: fetchProfile
  };
};

export default useProfile; 