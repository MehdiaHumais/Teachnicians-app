import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings, createBuilding, updateBuilding, deleteBuilding } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BottomNav from '../components/ui/BottomNav';
import BackButton from '../components/ui/BackButton'; // Import the back button

const ManageBuildings = () => {
  const { user } = useAuth();
  const [buildings, setBuildings] = useState([]);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [newBuilding, setNewBuilding] = useState({
    name: '', address: '', technologySummary: '', complexityPercentage: 0, requiredTechnicians: 1, parkingType: 'Underground', parkingInstructions: ''
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(''); // Clear any previous errors
        console.log("ManageBuildings: Calling getBuildings API..."); // Debug log
        const data = await getBuildings(); // This should fetch from your API
        console.log("ManageBuildings: API call successful, received ", data); // Debug log
        setBuildings(data);
      } catch (err) {
        console.error("ManageBuildings: Error fetching buildings:", err);
        setError(`Failed to load buildings: ${err.message || err}`);
      } finally {
        console.log("ManageBuildings: Setting loading to false."); // Debug log
        setLoading(false); // Always set loading to false after fetching
      }
    };
    fetchBuildings();
  }, []); // Empty dependency array means this runs once on mount

  if (user?.role !== 'Admin') {
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  const handleCreate = async () => {
    console.log("ManageBuildings: handleCreate called with:", newBuilding); // Debug log
    if (!newBuilding.name) {
      setError("Building name is required.");
      console.log("ManageBuildings: Create failed - name missing."); // Debug log
      return; // Basic validation
    }
    setError(''); // Clear error before action
    try {
      // const created = await createBuilding(newBuilding); // Call API
      // Mock creation
      const created = {
        ...newBuilding,
        id: `b${buildings.length + 1}`,
        floors: [],
        risers: [],
        images: [],
        techPDFs: []
      };
      console.log("ManageBuildings: Mock creation successful, new building:", created); // Debug log
      setBuildings([...buildings, created]);
      setNewBuilding({
        name: '',
        address: '',
        technologySummary: '',
        complexityPercentage: 0,
        requiredTechnicians: 1,
        parkingType: 'Underground',
        parkingInstructions: ''
      });
    } catch (err) {
      console.error("ManageBuildings: Error creating building:", err); // Debug log
      setError(`Failed to create building: ${err.message || err}`);
    }
  };

  const handleUpdate = async () => {
    console.log("ManageBuildings: handleUpdate called with:", editingBuilding); // Debug log
    if (!editingBuilding || !editingBuilding.name) {
      setError("Building name is required for update.");
      console.log("ManageBuildings: Update failed - editingBuilding or name missing."); // Debug log
      return;
    }
    setError(''); // Clear error before action
    try {
      // await updateBuilding(editingBuilding.id, editingBuilding); // Call API
      // Mock update
      console.log("ManageBuildings: Mock update successful for:", editingBuilding); // Debug log
      setBuildings(buildings.map(b => b.id === editingBuilding.id ? editingBuilding : b));
      setEditingBuilding(null);
    } catch (err) {
      console.error("ManageBuildings: Error updating building:", err); // Debug log
      setError(`Failed to update building: ${err.message || err}`);
    }
  };

  const handleDelete = async (id) => {
    console.log("ManageBuildings: handleDelete called for id:", id); // Debug log
    setError(''); // Clear error before action
    try {
      // await deleteBuilding(id); // Call API
      // Mock deletion
      console.log("ManageBuildings: Mock deletion successful for id:", id); // Debug log
      setBuildings(buildings.filter(b => b.id !== id));
      if (editingBuilding && editingBuilding.id === id) {
        setEditingBuilding(null);
      }
    } catch (err) {
      console.error("ManageBuildings: Error deleting building:", err); // Debug log
      setError(`Failed to delete building: ${err.message || err}`);
    }
  };

  const startEditing = (building) => {
    console.log("ManageBuildings: startEditing called for:", building); // Debug log
    setEditingBuilding({ ...building });
  };

  const handleChange = (e, field, isEditing = false) => {
    const value = e.target.value;
    console.log("ManageBuildings: handleChange for field:", field, "value:", value, "isEditing:", isEditing); // Debug log
    if (isEditing) {
      setEditingBuilding(prev => ({ ...prev, [field]: value }));
    } else {
      setNewBuilding(prev => ({ ...prev, [field]: value }));
    }
  };

  if (loading) {
    console.log("ManageBuildings: Loading state active, showing loader..."); // Debug log
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Buildings...</h1>
        </div>
      </div>
    );
  }

  console.log("ManageBuildings: Rendering main content. Buildings count:", buildings.length); // Debug log

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto relative"> {/* Add relative class for back button positioning */}
        <BackButton /> {/* Add the back button */}
        <h1 className="text-2xl font-bold mb-4 ml-12">Manage Buildings</h1> {/* Add left margin to make space for back button */}

        {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}

        <Card className="mockup-card mb-4">
          <h3 className="mockup-card-header">Add New Building</h3>
          <Input label="Name" value={newBuilding.name} onChange={(e) => handleChange(e, 'name')} />
          <Input label="Address" value={newBuilding.address} onChange={(e) => handleChange(e, 'address')} />
          <Input label="Technology Summary" value={newBuilding.technologySummary} onChange={(e) => handleChange(e, 'technologySummary')} />
          <Input label="Complexity %" type="number" value={newBuilding.complexityPercentage} onChange={(e) => handleChange(e, 'complexityPercentage')} />
          <Input label="Required Techs" type="number" value={newBuilding.requiredTechnicians} onChange={(e) => handleChange(e, 'requiredTechnicians')} />
          <select value={newBuilding.parkingType} onChange={(e) => handleChange(e, 'parkingType')} className="input-mockup mb-2">
            <option value="Underground">Underground</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Street">Street</option>
            <option value="Other">Other</option>
          </select>
          <Input label="Parking Instructions" value={newBuilding.parkingInstructions} onChange={(e) => handleChange(e, 'parkingInstructions')} />
          <Button onClick={handleCreate} className="btn-mockup mt-2">Create Building</Button>
        </Card>

        {editingBuilding && (
          <Card className="mockup-card mb-4">
            <h3 className="mockup-card-header">Edit Building: {editingBuilding.name}</h3>
            <Input label="Name" value={editingBuilding.name} onChange={(e) => handleChange(e, 'name', true)} />
            <Input label="Address" value={editingBuilding.address} onChange={(e) => handleChange(e, 'address', true)} />
            <Input label="Technology Summary" value={editingBuilding.technologySummary} onChange={(e) => handleChange(e, 'technologySummary', true)} />
            <Input label="Complexity %" type="number" value={editingBuilding.complexityPercentage} onChange={(e) => handleChange(e, 'complexityPercentage', true)} />
            <Input label="Required Techs" type="number" value={editingBuilding.requiredTechnicians} onChange={(e) => handleChange(e, 'requiredTechnicians', true)} />
            <select value={editingBuilding.parkingType} onChange={(e) => handleChange(e, 'parkingType', true)} className="input-mockup mb-2">
              <option value="Underground">Underground</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Street">Street</option>
              <option value="Other">Other</option>
            </select>
            <Input label="Parking Instructions" value={editingBuilding.parkingInstructions} onChange={(e) => handleChange(e, 'parkingInstructions', true)} />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleUpdate} className="btn-mockup">Save Changes</Button>
              <Button onClick={() => setEditingBuilding(null)} className="btn-mockup-outline">Cancel</Button>
            </div>
          </Card>
        )}

        <h2 className="text-xl font-bold mt-4 mb-2">Existing Buildings</h2>
        <div className="space-y-2">
          {buildings.map(building => (
            <Card key={building.id} className="mockup-card flex justify-between items-center">
              <div>
                <h3 className="font-bold">{building.name}</h3>
                <p className="text-sm text-gray-400">{building.address}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => startEditing(building)} className="btn-mockup-outline text-xs">Edit</Button>
                <Button onClick={() => handleDelete(building.id)} className="btn-mockup-outline text-xs bg-red-600 hover:bg-red-700">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ManageBuildings;