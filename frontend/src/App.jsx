import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './home/HomePage';
import Signup from './registration/Signup';
import SignIn from './registration/SignIn';
import ForgotPassword from './registration/ForgotPassword';
import Splash from './registration/Splash';
import PrescriptionEntry from './prescription/Entry';
import PrescriptionHistory from './prescription/History';
import Profile from './home/Profile';
import Reminders from './home/Reminders';
import Search from './home/Search';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, user, checkAuthStatus } = useAuth();
  const [userData, setUserData] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Update userData when user from useAuth changes
  useEffect(() => {
    if (user) {
      setUserData(user);
      console.log('App - userData updated from auth:', user);
    }
  }, [user]);

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
    };
    checkAuth();
  }, [checkAuthStatus]);

  const handleAuthSuccess = (user) => {
    setUserData(user);
    console.log('App - handleAuthSuccess received user:', user);
  };

  const handleAddPrescription = (newPrescription) => {
    setPrescriptions((prevPrescriptions) => {
      const updatedPrescriptions = [...prevPrescriptions, { id: Date.now(), ...newPrescription }];
      console.log('App - Prescriptions after add:', updatedPrescriptions); // Debugging line
      return updatedPrescriptions;
    });
  };

  const handleEditPrescription = (updatedPrescription) => {
    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.map((p) =>
        p.id === updatedPrescription.id ? updatedPrescription : p
      )
    );
    console.log('App - Prescriptions after edit:', prescriptions); // Debugging line
  };

  const handleDeletePrescription = (id) => {
    setPrescriptions((prevPrescriptions) =>
      prevPrescriptions.filter((p) => p.id !== id)
    );
    console.log('App - Prescriptions after delete:', prescriptions); // Debugging line
  };

  const handleUpdateProfile = (updatedProfileData) => {
    setUserData((prevUserData) => ({
      ...prevUserData, 
      ...updatedProfileData
    }));
    console.log('App - userData after handleUpdateProfile:', updatedProfileData); // Debugging line
  };

  const handleAddReminder = (newReminder) => {
    setReminders((prevReminders) => [...prevReminders, { id: Date.now(), ...newReminder }]);
  };

  const handleEditReminder = (updatedReminder) => {
    setReminders((prevReminders) =>
      prevReminders.map((r) => (r.id === updatedReminder.id ? updatedReminder : r))
    );
  };

  const handleDeleteReminder = (id) => {
    setReminders((prevReminders) => prevReminders.filter((r) => r.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signup" element={<Signup onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/signin" element={<SignIn onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route 
          path="/profile"
          element={isAuthenticated ? 
            <Profile 
              userData={userData}
              onUpdateProfile={handleUpdateProfile}
            /> 
            : <Navigate to="/signin" replace />}
        />

        <Route 
          path="/prescription-entry"
          element={isAuthenticated ? 
            <PrescriptionEntry 
              prescriptions={prescriptions}
              addPrescription={handleAddPrescription}
              editPrescription={handleEditPrescription}
              deletePrescription={handleDeletePrescription}
            /> 
            : <Navigate to="/signin" replace />}
        />

        <Route 
          path="/prescription-history"
          element={isAuthenticated ? 
            <PrescriptionHistory 
              prescriptions={prescriptions}
            /> 
            : <Navigate to="/signin" replace />}
        />

        <Route 
          path="/reminders"
          element={isAuthenticated ? 
            <Reminders 
              reminders={reminders}
              addReminder={handleAddReminder}
              editReminder={handleEditReminder}
              deleteReminder={handleDeleteReminder}
            /> 
            : <Navigate to="/signin" replace />}
        />

        <Route 
          path="/search"
          element={isAuthenticated ? <Search /> : <Navigate to="/signin" replace />}
        />

        <Route 
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;