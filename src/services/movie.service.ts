
import type { IMovie, IPaginatedMovies } from "../interfaces/IMovie";
import api from "./api";

//get all movies :
export const getAllMovies = async (): Promise<IMovie[]> => {
  try {
    const response = await api.get(`/movies/get`);

    const data: IMovie[] = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

//get by movie id:
export const getByIdMovie = async (movieId:number): Promise<IMovie> => {
  try {
    const response = await api.get(`movies/get/${movieId}`);

    const data: IMovie = response.data.movie;
    return data;
  } catch (error) {
    console.error("Error fetching movies by id:", error);
    throw error;
  }
};


// //get by movie pagination:
// export const getMovies_pagination = async(searchItem:string ,page = 1, limit=4):Promise<IPaginatedMovies>=>{
//   if(searchItem.length > 0){
//     const res = await api.get(`/movies/search?q=${searchItem}`);
//     return res.data;
//   }
//   const res = await api.get(`/movies/get?page=${page}&limit=${limit}`);
//   return res.data;
// }
// service/movie.service.ts
export const getMovies_pagination = async ( page = 1, limit = 4): Promise<IPaginatedMovies> => {
  // if (searchItem.trim().length > 0) {
  //   // Pass page and limit to search as well if your backend supports it
  //   const res = await api.get(`/movies/search?q=${searchItem}&page=${page}&limit=${limit}`);
  //   return res.data;
  // }
  const res = await api.get(`/movies/get?page=${page}&limit=${limit}`);
  return res.data;
}

export const getMoviesBySearch = async(searchItem:string)=>{
  const res = await api.get(`/movies/search?q=${searchItem}`);
  return res.data;
}

// //get movies by title:
// export const getMovieByTitle = async (
//   Titel: string
// ): Promise<IMovie[]> => {
//   const res = await api.post("/movies/getbytitle", {
//     Titel,
//   });

//   return res.data;
// };

export const getTheatersByMovieId = async (movieId: number) => {
  const response = await api.get(`/movies/${movieId}/theaters`);
  return response.data.data; // Matching your JSON response structure
};

export const getShowsByMovieAndTheater = async (movieId: number, theaterId: number) => {
  const res = await api.get(`movies/shows/movie/${movieId}/theater/${theaterId}`);
  return res.data; // This returns the JSON you provided
};
/////////////////////////
export const getShowsByMovieId = async (movie_id: number) => {
  const res = await api.get(`/movies/shows/${movie_id}`);
  return res.data.data;
};