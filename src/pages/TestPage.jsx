// src/pages/TestPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/ui/BottomNav';

const TestPage = () => {
  const { user } = useAuth();

  console.log("TestPage: Component rendering. User:", user); // Debug log

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

  console.log("TestPage: Rendering main content..."); // Debug log

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Test Page</h1>
        <p>This is a simple test page.</p>
        <p>User Role: {user?.role || 'N/A'}</p>
      </div>
      <BottomNav />
    </div>
  );
};

export default TestPage;