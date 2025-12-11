import React from 'react';
<<<<<<< HEAD
=======
import Button from '../ui/Button';
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1

const NearestRiserDisplay = ({ riserInfo }) => {
  const { above, below } = riserInfo;

  return (
<<<<<<< HEAD
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
=======
    <div className="space-y-3">
      {above ? (
        <div>
          <strong>Nearest Riser Above:</strong> {above.number} (Covers {above.floorsCovered})
          <br />
          <small>{above.location}</small>
          <br />
          <Button variant="outline" size="sm" className="mt-1">View Riser Details</Button>
        </div>
      ) : (
        <p>No riser above.</p>
      )}

      {below ? (
        <div>
          <strong>Nearest Riser Below:</strong> {below.number} (Covers {below.floorsCovered})
          <br />
          <small>{below.location}</small>
          <br />
          <Button variant="outline" size="sm" className="mt-1">View Riser Details</Button>
        </div>
      ) : (
        <p>No riser below.</p>
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      )}
    </div>
  );
};

export default NearestRiserDisplay;