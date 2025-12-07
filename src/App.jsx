import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import BuildingList from './pages/BuildingList';
import BuildingDetailPage from './pages/BuildingDetailPage';
import PDFViewerPage from './pages/PDFViewerPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import ManageBuildings from './pages/ManageBuildings';
import ManageFloorsRisers from './pages/ManageFloorsRisers';
import ManageImages from './pages/ManageImages';
import ManagePDFs from './pages/ManagePDFs';
import ManageUsers from './pages/ManageUsers';
import TestMinimal from './pages/TestMinimal';
import TestSimple from './pages/TestSimple';

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/buildings" element={<ProtectedRoute><BuildingList /></ProtectedRoute>} />
      <Route path="/building/:id" element={<ProtectedRoute><BuildingDetailPage /></ProtectedRoute>} />
      <Route path="/pdfs/:id" element={<ProtectedRoute><PDFViewerPage /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      <Route path="/admin/buildings" element={<AdminRoute><ManageBuildings /></AdminRoute>} />
      <Route path="/admin/floors-risers" element={<AdminRoute><ManageFloorsRisers /></AdminRoute>} />
      <Route path="/admin/images" element={<AdminRoute><ManageImages /></AdminRoute>} />
      <Route path="/admin/pdfs" element={<AdminRoute><ManagePDFs /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      <Route path="/test-simple" element={<AdminRoute><TestSimple /></AdminRoute>} /> 
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/test-minimal" element={<AdminRoute><TestMinimal /></AdminRoute>} /> 
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user, "loading:", loading);

  if (loading) {
    console.log("ProtectedRoute - Loading...");
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (!user) {
    console.log("ProtectedRoute - No user, redirecting to login..."); 
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute - User authenticated, rendering children...");
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("AdminRoute - user:", user, "loading:", loading);

  if (loading) {
    console.log("AdminRoute - Loading...");
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (!user || user.role !== 'Admin') {
    console.log("AdminRoute - Not admin or no user, redirecting to /buildings..."); 
    return <Navigate to="/buildings" replace />;
  }

  console.log("AdminRoute - Admin authenticated, rendering children...");
  return children;
};

export default AppWrapper;