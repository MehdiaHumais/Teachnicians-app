import React from 'react';
import { Link } from 'react-router-dom';
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
  );
};

export default BuildingCard;