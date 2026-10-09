import { Link, useNavigate } from "react-router-dom";
import type{ IMovie } from "../../interfaces/IMovie";
import { useState } from "react";



interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  // const navigate = useNavigate();

  const posterPath = `/src/assets/movies/${movie.image}`;
  return (
    <Link to={`/movies/${movie.id}`}>
    <div className="w-full max-w-sm rounded-xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      
      {/* Poster */}
      <div className="h-56 bg-gray-200 flex items-center justify-center">
        {/* <span className="text-gray-500">Poster</span> */}
        <img
  src={posterPath}
  alt={movie.name}
  className="w-full h-full object-contain"
/>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {movie.name}
        </h2>

        <p className="text-sm text-gray-500 whitespace-nowrap">
          {movie.description}
        </p>
        <p className="text-sm text-gray-500">
          {movie.release_date?.split('T')[0]}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-medium">
            ⭐ {movie.rating}
          </span>

          <span className="text-sm text-gray-600">
            {Math.floor(Number(movie.duration)/60)}hrs {Number(movie.duration)%60} mins
          </span>
        </div>
        
        {/* Action */}
        <button
          
          className="cursor-pointer mt-3 w-full rounded-lg bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
