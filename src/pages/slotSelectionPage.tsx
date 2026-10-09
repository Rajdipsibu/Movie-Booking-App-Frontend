import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowsByMovieAndTheater } from '../services/movie.service';

const SlotSelectionPage = () => {
  const { movieId, theaterId } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movieId && theaterId) {
      getShowsByMovieAndTheater(Number(movieId), Number(theaterId))
        .then((res) => setShows(res.data))
        .catch(() => console.error("Failed to fetch slots"))
        .finally(() => setLoading(false));
    }
  }, [movieId, theaterId]);

  if (loading) return <div className="text-white text-center p-20">Loading Slots...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header with Info from the first show object */}
      {shows.length > 0 && (
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-red-500 uppercase">{shows[0].movie_name}</h1>
          <p className="text-gray-400 mt-2 text-lg">Cinema: {shows[0].theater_name}</p>
          <div className="mt-4 inline-block bg-gray-800 px-4 py-2 rounded-full text-sm border border-gray-700">
            {new Date(shows[0].show_date).toDateString()}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-6 border-l-4 border-red-600 pl-4">Available Time Slots</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shows.map((show) => (
            <button
              key={show.show_id}
              onClick={() => {
                const token = localStorage.getItem("token");
                const bookingPath = `/show/${show.show_id}`;
                if (!token) {
                  // Not logged in — go to login, but remember where to come back
                  navigate("/login", { state: { from: bookingPath } });
                } else {
                  navigate(bookingPath);
                }
              }}
              className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-red-600 hover:bg-gray-800 transition-all group"
            >
              <span className="text-2xl font-bold group-hover:text-red-500 tracking-tighter">
                {show.show_time.slice(0, 5)}
              </span>
              <span className="text-[10px] text-gray-500 mt-1 uppercase">Morning / Evening</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center text-gray-600 text-sm">
        <p>Step 2 of 3: Select a preferred timing to proceed to seat selection.</p>
      </div>
    </div>
  );
};

export default SlotSelectionPage;