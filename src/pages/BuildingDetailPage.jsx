import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBuildingById, findNearestRisers } from '../services/api';
<<<<<<< HEAD
import BottomNav from '../components/ui/BottomNav';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import FloorSelector from '../components/building/FloorSelector';
import NearestRiserDisplay from '../components/building/NearestRiserDisplay';

const BuildingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [riserInfo, setRiserInfo] = useState({ above: null, below: null });
  const [showParkingImages, setShowParkingImages] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
<<<<<<< HEAD
      try {
        setLoading(true);
        const data = await getBuildingById(id);
        if (data) {
          setBuilding(data);
        } else {
          setError('Building not found.');
        }
      } catch (err) {
        setError('Failed to fetch building details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
=======
      const data = await getBuildingById(id);
      setBuilding(data);
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
    };
    fetchBuilding();
  }, [id]);

  useEffect(() => {
    if (building && selectedFloor !== null) {
      const info = findNearestRisers(building, selectedFloor);
      setRiserInfo(info);
    }
  }, [building, selectedFloor]);

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B181C] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B181C] flex flex-col items-center justify-center text-white p-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => navigate('/buildings')} className="mt-4 bg-teal-500 text-black">
          Back to Buildings
        </Button>
      </div>
    );
  }

  if (!building) {
    return null;
  }
  
  const parkingImages = building.images.filter(img => img.type === 'Parking').map(img => img.url);

  return (
    <div className="min-h-screen bg-[#0B181C] text-white flex flex-col">
      <div className="p-4 flex-grow relative pt-12 pb-20">
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{building.name}</h1>
          <p className="text-gray-400">{building.address}</p>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-gray-400">Technologies: </span>
            {building.technologySummary.split(', ').map(tech => (
              <span key={tech} className="inline-block bg-gray-700 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>

          <p><span className="text-gray-400">Complexity:</span> {building.complexityPercentage}%</p>
          <p><span className="text-gray-400">Required Techs:</span> {building.requiredTechnicians}</p>

          <div>
            <p className="flex items-center">
              <span className="text-gray-400 mr-4">Parking:</span>
              {parkingImages.length > 0 && (
                <Button onClick={() => setShowParkingImages(!showParkingImages)} className="bg-gray-700 text-white py-1 px-3 rounded-lg">
                  {showParkingImages ? 'Hide' : 'View'} Parking Photos
                </Button>
              )}
            </p>
            <p className="mt-2 text-gray-300">{building.parkingInstructions}</p>
            {showParkingImages && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {parkingImages.map((url, index) => (
                  <img key={index} src={url} alt={`Parking ${index + 1}`} className="w-full h-auto rounded-lg" />
                ))}
              </div>
            )}
          </div>
          
          <div>
            <p className="text-gray-400 mb-2">Floors:</p>
            <FloorSelector 
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
              floors={building.floors}
              onSelectFloor={setSelectedFloor}
              selectedFloor={selectedFloor}
            />
<<<<<<< HEAD
          </div>

          <div>
            <NearestRiserDisplay riserInfo={riserInfo} />
          </div>

          <div className="pt-4">
            <Link to={`/pdfs/${building.id}`} className="block w-full bg-[#00BFA5] text-black text-center font-bold py-3 rounded-lg hover:bg-teal-400 transition-colors">
              View ONT Configuration PDFs
            </Link>
          </div>
        </div>
      </div>
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      <BottomNav />
    </div>
  );
};

export default BuildingDetailPage;