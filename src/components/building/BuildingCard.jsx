import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

const BuildingCard = ({ building }) => {
  return (
    <Link to={`/building/${building.id}`} className="block w-full">
      <div className="bg-[#0D1C22] p-4 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200">
        <h3 className="text-xl font-bold text-white mb-3">{building.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Technology</span>
          <span className="text-white font-semibold">{building.complexityPercentage}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Required</span>
          <div className="flex items-center">
            <span className="text-white font-semibold">{building.requiredTechnicians} Techs</span>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
=======
import Button from '../ui/Button';

const BuildingCard = ({ building }) => {
  const getComplexityClass = (pct) => {
    if (pct <= 33) return 'mockup-complexity-low';
    if (pct <= 66) return 'mockup-complexity-medium';
    return 'mockup-complexity-high';
  };

  const techBadges = building.technologySummary.split(', ').map(tech => {
    const badgeClass = `mockup-badge mockup-badge-${tech.toLowerCase().replace(/\s+/g, '')}`;
    return <span key={tech} className={badgeClass}>{tech}</span>;
  });

  return (
    <div className="mockup-card">
      <h3 className="text-xl font-bold mb-1">{building.name}</h3>
      <p className="text-gray-400 mb-2">{building.address}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {techBadges}
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className={`mockup-badge ${getComplexityClass(building.complexityPercentage)}`}>
          {building.complexityPercentage}%
        </span>
        <span className="mockup-badge bg-blue-600">Req: {building.requiredTechnicians} Techs</span>
      </div>
      <Link to={`/building/${building.id}`}>
        <Button variant="outline" className="w-full">View Details</Button>
      </Link>
    </div>
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  );
};

export default BuildingCard;