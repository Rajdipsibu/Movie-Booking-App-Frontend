import React, { useState, useEffect } from 'react';
import { getAllTheater, type T } from '../services/theaterMovies';
import { Link } from 'react-router-dom';

const TheaterList: React.FC = () => {
  const [theaters, setTheaters] = useState<T[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("All Areas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTheater()
      .then(setTheaters)
      .finally(() => setLoading(false));
  }, []);

  // Extract unique areas for the filter buttons
  const uniqueAreas = ["All Areas", ...new Set(theaters.map(t => t.area))];

  const filteredTheaters = selectedArea === "All Areas" 
    ? theaters 
    : theaters.filter(t => t.area === selectedArea);

  if (loading) return <div className="text-white text-center p-10">Locating theaters...</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Select a Cinema</h2>

      {/* Area Filter Buttons */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {uniqueAreas.map(area => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
              selectedArea === area 
              ? "bg-red-600 border-red-600 text-white" 
              : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Theater Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTheaters.map((theater) => (
          <div key={theater.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-2xl hover:shadow-red-900/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{theater.name}</h3>
                <p className="text-gray-400 text-sm">{theater.address}</p>
              </div>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                {theater.area}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-6 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <span>Capacity:</span>
                <span className="text-white font-semibold">
                  {theater.total_rows * theater.total_columns} Seats
                </span>
              </div>
            </div>
            <Link to={`/shows/${theater.id}`}>
            <button  className="w-full bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-lg font-bold transition-all">
              View Showtimes              
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;