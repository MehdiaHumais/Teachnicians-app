import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import BuildingList from './pages/BuildingList';
import BuildingDetailPage from './pages/BuildingDetailPage';
import PDFViewerPage from './pages/PDFViewerPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
// Import the new pages
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
// Import the updated admin pages
import ManageBuildings from './pages/ManageBuildings';
import ManageFloorsRisers from './pages/ManageFloorsRisers';
import ManageImages from './pages/ManageImages';
import ManagePDFs from './pages/ManagePDFs';
import ManageUsers from './pages/ManageUsers';
import TestLoad from './pages/TestLoad';

// Move the Router to be the outermost wrapper
function AppWrapper() {
  return (
    <> {/* Router is now the outermost component */}
      <AuthProvider> {/* AuthProvider is now inside Router */}
        <App />
      </AuthProvider>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test-load" element={<AdminRoute><TestLoad /></AdminRoute>} /> {/* Add this temporary route */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/buildings" element={<ProtectedRoute><BuildingList /></ProtectedRoute>} />
      <Route path="/building/:id" element={<ProtectedRoute><BuildingDetailPage /></ProtectedRoute>} />
      <Route path="/pdfs/:id" element={<ProtectedRoute><PDFViewerPage /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      <Route path="/admin/buildings" element={<AdminRoute><ManageBuildings /></AdminRoute>} />
      <Route path="/admin/floors-risers" element={<AdminRoute><ManageFloorsRisers /></AdminRoute>} />
      <Route path="/admin/images" element={<AdminRoute><ManageImages /></AdminRoute>} />
      <Route path="/admin/pdfs" element={<AdminRoute><ManagePDFs /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

      {/* User Pages */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ProtectedRoute component: Only allows access if user is logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user, "loading:", loading); // Debug log

  if (loading) {
    console.log("ProtectedRoute - Loading..."); // Debug log
    return <div className="text-center mt-10">Loading...</div>; // Show a loading state while checking
  }
  if (!user) {
    console.log("ProtectedRoute - No user, redirecting to login..."); // Debug log
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  console.log("ProtectedRoute - User authenticated, rendering children..."); // Debug log
  return children; // Render the protected page if authenticated
};

// AdminRoute component: Only allows access if user is logged in AND is an Admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("AdminRoute - user:", user, "loading:", loading); // Debug log

  if (loading) {
    console.log("AdminRoute - Loading..."); // Debug log
    return <div className="text-center mt-10">Loading...</div>; // Show a loading state while checking
  }
  if (!user || user.role !== 'Admin') {
    console.log("AdminRoute - Not admin or no user, redirecting to /buildings..."); // Debug log
    return <Navigate to="/buildings" replace />; // Redirect non-admins to buildings
  }

  console.log("AdminRoute - Admin authenticated, rendering children..."); // Debug log
  return children; // Render the admin page if authenticated as admin
};

export default AppWrapper;