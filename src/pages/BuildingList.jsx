import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings } from '../services/api';
import BuildingCard from '../components/building/BuildingCard';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get user from context

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(''); // Clear any previous errors
        const data = await getBuildings(); // This should fetch from your API
        setBuildings(data);
      } catch (err) {
        console.error("Error fetching buildings:", err);
        setError(`Failed to load buildings: ${err.message || err}`);
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };
    fetchBuildings();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Buildings...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Buildings</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Building List</h1>
          {user?.role === 'Admin' && (
            <Link to="/admin">
              <Button variant="secondary">Admin Dashboard</Button>
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {buildings.map(building => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default BuildingList;