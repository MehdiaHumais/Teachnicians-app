import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import Button from '../components/ui/Button'; 
import BottomNav from '../components/ui/BottomNav';
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1

const AdminDashboardPage = () => {
  const { user } = useAuth();

  if (user?.role !== 'Admin') {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-[#0B181C] flex items-center justify-center text-white">
=======
      <div className="full-screen bg-dark flex items-center justify-center">
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B181C] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#00BFA5] mb-8">ADMIN DASHBOARD</h1>

        <div className="space-y-4">
          <Link to="/admin/buildings" className="block w-full bg-[#00BFA5] text-black font-bold py-4 rounded-lg text-lg hover:bg-teal-400 transition-colors">
            MANAGE BUILDINGS
          </Link>
          <Link to="/admin/floors-risers" className="block w-full bg-[#00BFA5] text-black font-bold py-4 rounded-lg text-lg hover:bg-teal-400 transition-colors">
            MANAGE FLOORS & RISERS
          </Link>
          <Link to="/admin/images" className="block w-full bg-[#00BFA5] text-black font-bold py-4 rounded-lg text-lg hover:bg-teal-400 transition-colors">
            MANAGE IMAGES
          </Link>
          <Link to="/admin/pdfs" className="block w-full bg-[#00BFA5] text-black font-bold py-4 rounded-lg text-lg hover:bg-teal-400 transition-colors">
            MANAGE TECHNOLOGY PDFs
          </Link>
          <Link to="/admin/users" className="block w-full bg-[#00BFA5] text-black font-bold py-4 rounded-lg text-lg hover:bg-teal-400 transition-colors">
            MANAGE USERS
          </Link>
        </div>
      </div>
=======
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-4">
          <Link to="/test-simple">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg bg-yellow-600 hover:bg-yellow-700">TEST: Simple Page</Button>
          </Link>
          <Link to="/admin/buildings">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Buildings</Button>
          </Link>
          <Link to="/admin/floors-risers">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Floors & Risers</Button>
          </Link>
          <Link to="/admin/images">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Images</Button>
          </Link>
          <Link to="/admin/pdfs">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Technology PDFs</Button>
          </Link>
          <Link to="/admin/users">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg">Manage Users</Button>
          </Link>
          <Link to="/test-simple">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg bg-yellow-600 hover:bg-yellow-700">TEST: Simple Page</Button>
          </Link>
          <Link to="/test-minimal">
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg bg-yellow-600 hover:bg-yellow-700">TEST: Minimal Page</Button>
          </Link>
          <Link to="/test-simple"> {/* Add this temporary link */}
            <Button variant="primary" className="btn-mockup w-full h-16 text-lg bg-yellow-600 hover:bg-yellow-700">TEST: Simple Page</Button>
          </Link>
        </div>
      </div>

      <BottomNav />
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
    </div>
  );
};

export default AdminDashboardPage;