import { useEffect, useState } from "react";
import type { IMovie } from "../interfaces/IMovie";
import { getMovies_pagination, getMoviesBySearch } from "../services/movie.service";
import MovieCard from "../components/movie/MovieCard";
import SearchBar from '../components/movie/SearchBar';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    fetchData();
  }, 500);

  return () => clearTimeout(delayDebounceFn);
}, [searchItem, page]);


const fetchData = async () => {
  setLoading(true);
  try {
    if (searchItem.trim() === "") {
      const res = await getMovies_pagination(page, 4);
      setMovies(res.data);
      setTotalPages(res.totalPages || 1);
    } else {
      const res = await getMoviesBySearch(searchItem);
      setMovies(res.data);
      setTotalPages(res.totalPages || 1);
    }
  } catch (err) {
    console.error("Search failed", err);
    toast.error("Failed to load movies");
  } finally {
    setLoading(false);
  }
};

const handleSearch = (title: string) => {
  setSearchItem(title);
  setPage(1); // Reset to first page on new search
};
  
  return (
    <div>
      {/* SearchBar always rendered — value is controlled from parent */}
      <SearchBar onSearch={handleSearch} value={searchItem} />
      
      {/* Show spinner inline, NOT as an early return that unmounts the SearchBar */}
      {loading ? (
        <div className="text-center py-10">Loading movies...</div>
      ) : (
        <>
          {/* Movies Grid */}
          <div className="grid grid-cols-4 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-4 text-center py-10 text-gray-400">
                No movies found for "{searchItem}"
              </div>
            )}
          </div>

          {/* Pagination Buttons - only show when not searching */}
          {searchItem.trim() === "" && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="cursor-pointer"
              >
                Prev
              </button>

              <span>{page} / {totalPages}</span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
