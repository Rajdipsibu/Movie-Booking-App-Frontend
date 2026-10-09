
import type { IMovie } from "../interfaces/IMovie";
import api from "./api";

//get all movies :
export interface T{
            id: number;
            name:string;
            area:string;
            address:string;
            total_rows:number;
            total_columns:number;
        }
interface theaters{
  success:string;
  theater:T[];
}
export const getAllTheater = async (): Promise<T[]> => {
  try {
    const response = await api.get<theaters>(`/theater`);

    const data: T[] = await response.data.theater;
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

//get all movie with theater id:
export const getAllMoviesByTheater_id = async (theater_id:number): Promise<IMovie[]> => {
  try {
    const response = await api.get(`/theater/${theater_id}/movies`);

    const data: IMovie[] = await response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
//get all movie and slot time with theater id:
export interface IShowtimeResponse {
    show_id: number;
    show_date: string;
    show_time: string;
    movie_id: number;
    movie_name: string;
    movie_image: string | null;
    duration: number | null;
    rating: string | null;
    theater_name: string;
    theater_area: string;
}
export const getAllMovies_showsByTheater_id = async (theater_id:number): Promise<IShowtimeResponse[]> => {
  try {
    const response = await api.get<{ success: boolean, showtimes: IShowtimeResponse[] }>(`/theater/${theater_id}`);

    const data: IShowtimeResponse[] = await response.data.showtimes;
    return data;
  } catch (error) {
    console.error("Error fetching movies and shows:", error);
    throw error;
  }
};
