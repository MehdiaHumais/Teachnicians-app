import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import BottomNav from '../components/ui/BottomNav';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  console.log("AdminDashboardPage: Rendering. Current user:", user);

  if (user?.role !== 'Admin') {
    console.log("AdminDashboardPage: Access denied, redirecting...");
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  console.log("AdminDashboardPage: User is admin, showing dashboard...");

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        
        <div className="grid grid-cols-1 gap-4">
          
          <Link to="/admin/buildings" onClick={(e) => alert("Manage Buildings button clicked!")}>
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Buildings</Button>
          </Link>
          <Link to="/admin/floors-risers" onClick={(e) => alert("Manage Floors & Risers button clicked!")}>
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Floors & Risers</Button>
          </Link>
          <Link to="/admin/images" onClick={(e) => alert("Manage Images button clicked!")}>
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Images</Button>
          </Link>
          <Link to="/admin/pdfs" onClick={(e) => alert("Manage Technology PDFs button clicked!")}>
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Technology PDFs</Button>
          </Link>
          <Link to="/admin/users" onClick={(e) => alert("Manage Users button clicked!")}>
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Users</Button>
          </Link>
          <Link to="/test">
  <Button variant="primary" className="btn-mockup w-full h-16 text-lg bg-yellow-600 hover:bg-yellow-700">TEST: Simple Page</Button>
</Link>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default AdminDashboardPage;