import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBuildingById, findNearestRisers } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FloorSelector from '../components/building/FloorSelector';
import NearestRiserDisplay from '../components/building/NearestRiserDisplay';
import BottomNav from '../components/ui/BottomNav';
import BackButton from '../components/ui/BackButton'; // Import the new component

const BuildingDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); // Get navigate function
  const [building, setBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [riserInfo, setRiserInfo] = useState({ above: null, below: null });
  const [showParkingImages, setShowParkingImages] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
      const data = await getBuildingById(id);
      setBuilding(data);
    };
    fetchBuilding();
  }, [id]);

  useEffect(() => {
    if (building && selectedFloor !== null) {
      const info = findNearestRisers(building, selectedFloor);
      setRiserInfo(info);
    }
  }, [building, selectedFloor]);

  if (!building) return <div className="text-center mt-10">Loading...</div>;

  const getComplexityClass = (pct) => {
    if (pct <= 33) return 'mockup-complexity-low';
    if (pct <= 66) return 'mockup-complexity-medium';
    return 'mockup-complexity-high';
  };

  // Function to get image URLs by type
  const getParkingImages = () => building.images.filter(img => img.type === 'Parking').map(img => img.url);

  const parkingImages = getParkingImages();

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto relative"> {/* Add relative class for back button positioning */}
        <BackButton /> {/* Add the back button */}
        <h1 className="text-2xl font-bold mb-1 ml-12"> {/* Add left margin to make space for back button */} {building.name}</h1>
        <p className="text-gray-400 mb-4 ml-12">{building.address}</p> {/* Add left margin to make space for back button */}

        <div className="space-y-4">
          <Card className="mockup-card">
            <h3 className="mockup-card-header">Technologies</h3>
            <div className="flex flex-wrap gap-1">
              {building.technologySummary.split(', ').map(tech => (
                <span key={tech} className={`mockup-badge mockup-badge-${tech.toLowerCase().replace(/\s+/g, '')}`}>{tech}</span>
              ))}
            </div>
          </Card>

          <Card className="mockup-card">
            <div className="flex justify-between items-center">
              <div>
                <span className={`mockup-badge ${getComplexityClass(building.complexityPercentage)}`}>
                  Complexity: {building.complexityPercentage}%
                </span>
              </div>
              <div>
                <span className="mockup-badge bg-blue-600">Required Technicians: {building.requiredTechnicians}</span>
              </div>
            </div>
          </Card>

          <Card className="mockup-card">
            <h3 className="mockup-card-header">Parking</h3>
            <p><strong>Type:</strong> {building.parkingType}</p>
            <p><strong>Instructions:</strong> {building.parkingInstructions}</p>
            {parkingImages.length > 0 && (
              <Button variant="outline" className="btn-mockup-outline mt-2" onClick={() => setShowParkingImages(!showParkingImages)}>
                {showParkingImages ? 'Hide' : 'View'} Parking Photos
              </Button>
            )}
            {showParkingImages && (
              <div className="mt-2">
                {parkingImages.map((url, index) => (
                  <img key={index} src={url} alt={`Parking ${index + 1}`} className="w-full h-auto rounded-md mb-2" />
                ))}
              </div>
            )}
          </Card>

          <Card className="mockup-card">
            <h3 className="mockup-card-header">Floors</h3>
            <FloorSelector
              floors={building.floors}
              onSelectFloor={setSelectedFloor}
              selectedFloor={selectedFloor}
            />
          </Card>

          {selectedFloor !== null && (
            <Card className="mockup-card">
              <h3 className="mockup-card-header">Nearest Risers</h3>
              <NearestRiserDisplay riserInfo={riserInfo} />
            </Card>
          )}

          <Card className="mockup-card">
            <h3 className="mockup-card-header">ONT Configuration PDFs</h3>
            <Link to={`/pdfs/${building.id}`}>
              <Button variant="primary" className="btn-mockup w-full">View / Download Technology PDFs</Button>
            </Link>
          </Card>

          {user?.role === 'Admin' && (
            <Card className="mockup-card">
              <h3 className="mockup-card-header">Admin Actions</h3>
              <Link to={`/admin/buildings/edit/${building.id}`}>
                <Button variant="outline" className="btn-mockup-outline w-full mb-2">Edit Building</Button>
              </Link>
              <Link to={`/admin/pdfs/upload?buildingId=${building.id}`}>
                <Button variant="outline" className="btn-mockup-outline w-full mb-2">Upload PDF</Button>
              </Link>
              <Link to={`/admin/images/upload?buildingId=${building.id}`}>
                <Button variant="outline" className="btn-mockup-outline w-full">Upload Images</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default BuildingDetailPage;