// src/pages/PDFViewerPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBuildingById } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BottomNav from '../components/ui/BottomNav';

const PDFViewerPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buildingNotFound, setBuildingNotFound] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
      setLoading(true);
      try {
        const data = await getBuildingById(id);
        if (data) {
          setBuilding(data);
          setBuildingNotFound(false);
        } else {
          console.error(`Building with ID ${id} not found`);
          setBuildingNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching building:", error);
        setBuildingNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilding();
  }, [id]);

  if (loading) {
    return (
      <div className="full-screen bg-dark flex flex-col">
        <div className="p-4 flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">ONT Configuration Documents</h1>
          <div className="text-center mt-10">Loading...</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (buildingNotFound) {
    return (
      <div className="full-screen bg-dark flex flex-col">
        <div className="p-4 flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">ONT Configuration Documents</h1>
          <div className="text-center mt-10 text-red-500">
            Building not found. Please check the URL or go back to the building list.
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!building) {
    return (
      <div className="full-screen bg-dark flex flex-col">
        <div className="p-4 flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">ONT Configuration Documents</h1>
          <div className="text-center mt-10">Building data is not available.</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">ONT Configuration Documents – {building.name}</h1>

        <div className="space-y-4">
          {building.techPDFs.map(pdf => (
            <Card key={pdf.id} className="mockup-card">
              <h3 className="mockup-card-header">{pdf.title}</h3>
              <p className="text-gray-400 mb-2">Tech: {pdf.tech}</p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="btn-mockup" onClick={() => window.open(pdf.url, '_blank')}>
                  OPEN PDF
                </Button>
                <Button variant="outline" size="sm" className="btn-mockup-outline" onClick={() => {
                  const link = document.createElement('a');
                  link.href = pdf.url;
                  link.download = pdf.title.replace(/\s+/g, '_') + '.pdf';
                  link.click();
                }}>
                  DOWNLOAD
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default PDFViewerPage;