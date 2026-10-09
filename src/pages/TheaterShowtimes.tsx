import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllMovies_showsByTheater_id, type IShowtimeResponse } from '../services/theaterMovies';

// Double Grouping: Movie Name -> { Show Date -> Array of Slots }
type GroupedByDate = Record<string, IShowtimeResponse[]>;
type GroupedMovies = Record<string, GroupedByDate>;

const TheaterShowtimes = () => {
    const { id } = useParams<{ id: string }>();
    const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>({});
    const [theaterInfo, setTheaterInfo] = useState<{ name: string; area: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getAllMovies_showsByTheater_id(Number(id))
                .then((data) => {
                    if (data.length > 0) {
                        setTheaterInfo({ name: data[0].theater_name, area: data[0].theater_area });
                    }

                    // Logic: Group by Movie, then by Date
                    const grouped = data.reduce((acc, curr) => {
                        const movieName = curr.movie_name;
                        const dateStr = new Date(curr.show_date).toLocaleDateString('en-GB', {
                            weekday: 'short', day: '2-digit', month: 'short'
                        });

                        if (!acc[movieName]) acc[movieName] = {};
                        if (!acc[movieName][dateStr]) acc[movieName][dateStr] = [];
                        
                        acc[movieName][dateStr].push(curr);
                        return acc;
                    }, {} as GroupedMovies);
                    
                    setGroupedMovies(grouped);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="text-white text-center p-20 font-bold">Loading Theater Schedule...</div>;

    return (
        <div className="bg-[#F2F2F2] min-h-screen p-4 md:p-8 text-black">
            {/* Theater Header Section */}
            {theaterInfo && (
                <div className="max-w-6xl mx-auto mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{theaterInfo.name}</h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <span className="text-red-500">📍</span> {theaterInfo.area}
                    </p>
                </div>
            )}

            {/* Movie List Section */}
            <div className="max-w-6xl mx-auto space-y-6">
                {Object.entries(groupedMovies).map(([movieName, dateGroups]) => {
                    const firstSlot = Object.values(dateGroups)[0][0];

                    return (
                        <div key={movieName} className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                            {/* Left Side: Movie Poster */}
                            <div className="md:w-56 bg-gray-100 border-r border-gray-100">
                                <img 
                                    src={`/src/assets/movies/${firstSlot.movie_image}`} 
                                    alt={movieName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Right Side: Details and Timings Line-by-Line */}
                            <div className="flex-1 p-6 md:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{movieName}</h2>
                                        <div className="flex gap-3 text-xs font-bold text-gray-400 mt-1 uppercase">
                                            <span>{Math.floor(Number(firstSlot.duration)/60)}hrs {Number(firstSlot.duration)%60} mins</span>
                                            
                                            <span className="text-yellow-600 font-black">⭐ {firstSlot.rating}</span>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span>
                                </div>

                                {/* Line-by-Line Dates and Times */}
                                <div className="space-y-6">
                                    {Object.entries(dateGroups).map(([dateLabel, slots]) => (
                                        <div key={dateLabel} className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                            {/* Date Label Column */}
                                            <div className="sm:w-32">
                                                <p className="text-xs font-black text-red-500 uppercase tracking-tighter">
                                                    {dateLabel}
                                                </p>
                                            </div>

                                            {/* Time Slots Row */}
                                            <div className="flex flex-wrap gap-3">
                                                {slots.sort((a,b) => a.show_time.localeCompare(b.show_time)).map((slot) => (
                                                    <Link 
                                                        key={slot.show_id}
                                                        to={`/show/${slot.show_id}`}
                                                        className="px-5 py-2 border border-green-500 text-green-600 rounded-lg text-sm font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    >
                                                        {slot.show_time.slice(0, 5)}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TheaterShowtimes;