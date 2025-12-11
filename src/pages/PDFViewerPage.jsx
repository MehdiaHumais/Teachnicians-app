import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBuildingById } from '../services/api';
import BottomNav from '../components/ui/BottomNav';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

const PDFViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuilding = async () => {
      setLoading(true);
      try {
        const data = await getBuildingById(id);
        if (data) {
          setBuilding(data);
        } else {
          setError('Building not found.');
        }
      } catch (err) {
        setError('Failed to fetch building data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilding();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-[#0B181C] text-white flex flex-col">
      <div className="p-4 flex-grow relative pt-12">
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">ONT CONFIGURATION PDFs</h1>

        <div className="space-y-4">
          {building.techPDFs && building.techPDFs.length > 0 ? (
            building.techPDFs.map(pdf => (
              <div key={pdf.id} className="bg-[#0D1C22] p-4 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">{pdf.title}</h3>
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-[#00BFA5] text-black font-bold py-2 rounded-lg"
                    onClick={() => window.open(pdf.url, '_blank')}
                  >
                    OPEN PDF
                  </Button>
                  <Button
                    className="flex-1 bg-gray-600 text-white font-bold py-2 rounded-lg"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = pdf.url;
                      link.download = pdf.title.replace(/\s+/g, '_') + '.pdf';
                      link.click();
                    }}
                  >
                    DOWNLOAD
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No PDF documents available for this building.</p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PDFViewerPage;