import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings } from '../services/api'; // Fetch buildings to link images
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BottomNav from '../components/ui/BottomNav';

const ManageImages = () => {
  const { user } = useAuth();
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ type: 'Parking', url: '' });
  useEffect(() => {
    const fetchBuildings = async () => {
      const data = await getBuildings();
      setBuildings(data);
    };
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuildingId) {
      const building = buildings.find(b => b.id === selectedBuildingId);
      if (building) {
        setImages(building.images || []);
      }
    } else {
        setImages([]);
    }
  }, [selectedBuildingId, buildings]);

  if (user?.role !== 'Admin') {
    return <div className="text-center mt-10">Access Denied. Admins Only.</div>;
  }

  const handleAddImage = () => {
    if (!selectedBuildingId || !newImage.url) return; // Basic validation
    // Mock update - find building and add image
    const updatedBuildings = buildings.map(b => {
      if (b.id === selectedBuildingId) {
        const newImageObj = { id: `i${b.images.length + 1}`, type: newImage.type, url: newImage.url };
        return { ...b, images: [...(b.images || []), newImageObj] };
      }
      return b;
    });
    setBuildings(updatedBuildings);
    setImages([...images, { id: `i${images.length + 1}`, type: newImage.type, url: newImage.url }]);
    setNewImage({ type: 'Parking', url: '' });
  };

  const handleDeleteImage = (imageId) => {
    const updatedBuildings = buildings.map(b => {
      if (b.id === selectedBuildingId) {
        return { ...b, images: b.images.filter(i => i.id !== imageId) };
      }
      return b;
    });
    setBuildings(updatedBuildings);
    setImages(images.filter(i => i.id !== imageId));
  };

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Building Images</h1>

        <select
          value={selectedBuildingId}
          onChange={(e) => setSelectedBuildingId(e.target.value)}
          className="input-mockup mb-4 w-full"
        >
          <option value="">Select a Building</option>
          {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        {selectedBuildingId && (
          <>
            <Card className="mockup-card mb-4">
              <h3 className="mockup-card-header">Add Image to {buildings.find(b => b.id === selectedBuildingId)?.name}</h3>
              <select
                value={newImage.type}
                onChange={(e) => setNewImage({...newImage, type: e.target.value})}
                className="input-mockup mb-2"
              >
                <option value="Parking">Parking</option>
                <option value="Entrance">Entrance</option>
                <option value="Riser">Riser</option>
                <option value="Panel">Panel</option>
                <option value="Other">Other</option>
              </select>
              <Input label="Image URL" value={newImage.url} onChange={(e) => setNewImage({...newImage, url: e.target.value})} />
              <Button onClick={handleAddImage} className="btn-mockup mt-2">Add Image</Button>
            </Card>

            <h2 className="text-xl font-bold mt-4 mb-2">Images</h2>
            <div className="grid grid-cols-2 gap-2">
              {images.map(image => (
                <Card key={image.id} className="mockup-card flex flex-col items-center">
                  <img src={image.url} alt={`${image.type} for ${buildings.find(b => b.id === selectedBuildingId)?.name}`} className="w-full h-auto rounded-md mb-2" />
                  <p className="text-xs">{image.type}</p>
                  <Button onClick={() => handleDeleteImage(image.id)} className="btn-mockup-outline text-xs bg-red-600 hover:bg-red-700 mt-1">Delete</Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ManageImages;