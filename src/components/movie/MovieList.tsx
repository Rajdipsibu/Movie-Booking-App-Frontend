import MovieCard from "./MovieCard";
import type{ IMovie } from "../../interfaces/IMovie";

interface MovieListProps {
  movies: IMovie[];
}

const MovieList = ({ movies }: MovieListProps) => {

  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No movies available
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieList;
