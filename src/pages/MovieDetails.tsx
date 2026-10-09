import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowsByMovieId } from "../services/movie.service";
import toast from "react-hot-toast";

// Updated Interface to match your JSON exactly
interface IMovieShow {
  show_id: number;
  show_date: string;
  show_time: string;
  movie_name: string;
  movie_image: string;
  movie_time: number;
  theater_name: string;
  total_rows: number;
  total_columns: number;
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [allShows, setAllShows] = useState<IMovieShow[]>([]);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [activeDate, setActiveDate] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getShowsByMovieId(Number(id))
      .then((data: IMovieShow[]) => {
        if (data.length > 0) {
          setAllShows(data);
          
          // 1. Extract unique dates from the API response
          const dates = Array.from(new Set(data.map(s => s.show_date.split('T')[0])));
          setUniqueDates(dates);
          setActiveDate(dates[0]); // Default to the first available date
        }
      })
      .catch(() => toast.error("Failed to load shows"))
      .finally(() => setLoading(false));
  }, [id]);

  // 2. Filter and Group shows based on the selected Active Date
  const getFilteredTheaters = () => {
    const filtered = allShows.filter(s => s.show_date.split('T')[0] === activeDate);
    
    return filtered.reduce((acc, curr) => {
      if (!acc[curr.theater_name]) acc[curr.theater_name] = [];
      acc[curr.theater_name].push(curr);
      return acc;
    }, {} as Record<string, IMovieShow[]>);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  const movieInfo = allShows[0];
  const groupedTheaters = getFilteredTheaters();

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* 1. Header Section */}
      <div className="bg-white border-b p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold uppercase">{movieInfo?.movie_name}</h1>
          <div className="flex gap-2 mt-2">
            <span className="border rounded-full px-3 py-1 text-xs text-gray-500 uppercase">UA13+</span>
            <span className="border rounded-full px-3 py-1 text-xs text-gray-500 uppercase">Action</span>
          </div>
        </div>
      </div>

      {/* 2. Date Selection Bar (Like the Screenshot) */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex gap-4 p-3 px-6 overflow-x-auto">
          {uniqueDates.map((dateStr) => {
            const dateObj = new Date(dateStr);
            const isSelected = activeDate === dateStr;
            return (
              <div
                key={dateStr}
                onClick={() => setActiveDate(dateStr)}
                className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg cursor-pointer transition-all
                  ${isSelected ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span className="text-[10px] uppercase font-bold">{dateObj.toLocaleString('en-us', { weekday: 'short' })}</span>
                <span className="text-lg font-black">{dateObj.getDate()}</span>
                <span className="text-[10px] uppercase font-bold">{dateObj.toLocaleString('en-us', { month: 'short' })}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Theater List */}
      <div className="max-w-6xl mx-auto mt-6 p-4">
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          {Object.entries(groupedTheaters).map(([theaterName, slots]) => (
            <div key={theaterName} className="flex flex-col md:flex-row border-b last:border-0 p-6">
              <div className="md:w-1/4">
                <h3 className="font-bold text-sm uppercase">{theaterName}</h3>
                <div className="flex gap-2 mt-4">
                    <span className="text-green-500 text-[10px] border border-green-100 px-1">M-Ticket</span>
                </div>
              </div>

              <div className="md:w-3/4 flex flex-wrap gap-4 mt-4 md:mt-0">
                {slots.sort((a,b) => a.show_time.localeCompare(b.show_time)).map((show) => (
                  <div key={show.show_id} className="text-center group">
                    <button
                      onClick={() => navigate(`/show/${show.show_id}`)}
                      className="border border-gray-300 rounded px-6 py-2 text-[12px] text-green-600 hover:bg-green-500 hover:text-white font-bold transition-all"
                    >
                      {show.show_time.slice(0, 5)}
                    </button>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase">Cancellation available</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;