// src/pages/TestLoad.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/ui/BottomNav';

const TestLoad = () => {
  const { user } = useAuth();
  const [loadingState, setLoadingState] = useState('initial'); // 'initial', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  console.log("TestLoad: Component rendering. User:", user, "Loading State:", loadingState); // Debug log

  useEffect(() => {
    console.log("TestLoad: useEffect started..."); // Debug log
    setLoadingState('loading');
    setMessage('Simulating data fetch...');

    // Simulate an API call that might take time or hang
    const fetchData = async () => {
      try {
        console.log("TestLoad: Starting simulated fetch..."); // Debug log
        // Simulate a delay (e.g., fetching complex data)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        console.log("TestLoad: Simulated fetch completed."); // Debug log
        setMessage('Data loaded successfully!');
        setLoadingState('success');
      } catch (err) {
        console.error("TestLoad: Simulated fetch failed:", err); // Debug log
        setMessage(`Error: ${err.message}`);
        setLoadingState('error');
      }
    };

    fetchData();
  }, []);

  if (user?.role !== 'Admin') {
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Test Load Page</h1>
        <p>Status: {message}</p>
        <p>Loading State Variable: {loadingState}</p>
        <p>User Role: {user?.role || 'N/A'}</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default TestLoad;