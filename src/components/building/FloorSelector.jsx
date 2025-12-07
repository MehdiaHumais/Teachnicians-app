import React from 'react';

const FloorSelector = ({ floors, onSelectFloor, selectedFloor }) => {
  return (
    <select
      value={selectedFloor || ''}
      onChange={(e) => onSelectFloor(parseInt(e.target.value))}
      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">Select Your Current Floor</option>
      {floors.map(floor => (
        <option key={floor.id} value={floor.number}>
          Floor {floor.number} {floor.desc ? `(${floor.desc})` : ''}
        </option>
      ))}
    </select>
  );
};

export default FloorSelector;