import React from 'react';

const NearestRiserDisplay = ({ riserInfo }) => {
  const { above, below } = riserInfo;

  return (
    <div>
      {above && (
        <p className="text-white">
          Nearest Riser Above: {above.number} (Floor {above.minFloor})
        </p>
      )}
      {below && (
        <p className="text-white">
          Nearest Riser Below: {below.number} (Floor {below.maxFloor})
        </p>
      )}
      {!above && !below && (
        <p className="text-gray-400">Select a floor to see nearest riser information.</p>
      )}
    </div>
  );
};

export default NearestRiserDisplay;