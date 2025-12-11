import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings } from '../services/api';
import BuildingCard from '../components/building/BuildingCard';
import BottomNav from '../components/ui/BottomNav';
import Input from '../components/ui/Input';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [technologyFilter, setTechnologyFilter] = useState('');
  const [complexityFilter, setComplexityFilter] = useState('');

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getBuildings();
        setBuildings(data);
      } catch (err) {
        console.error("Error fetching buildings:", err);
        setError(`Failed to load buildings: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const filteredBuildings = buildings
    .filter(building =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(building =>
      technologyFilter === '' || building.technologySummary.toLowerCase().includes(technologyFilter.toLowerCase())
    )
    .filter(building => {
      if (complexityFilter === '') return true;
      const [min, max] = complexityFilter.split('-').map(Number);
      return building.complexityPercentage >= min && building.complexityPercentage <= max;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B181C] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Loading Buildings...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B181C] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Error Loading Buildings</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B181C] flex flex-col text-white">
      <div className="p-4 flex-grow">
        <div className="mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1C22] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <select
              value={technologyFilter}
              onChange={(e) => setTechnologyFilter(e.target.value)}
              className="w-full bg-[#0D1C22] text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Technologies</option>
              <option value="Huawei">Huawei</option>
              <option value="Nokia">Nokia</option>
              <option value="Positron">Positron</option>
            </select>
            <select
              value={complexityFilter}
              onChange={(e) => setComplexityFilter(e.target.value)}
              className="w-full bg-[#0D1C22] text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Complexities</option>
              <option value="0-50">0-50%</option>
              <option value="51-100">51-100%</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto pb-20">
          {filteredBuildings.map(building => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default BuildingList;