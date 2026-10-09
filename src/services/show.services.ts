import api from "./api";

export interface IShowDetails {
  show_id: number;
  show_date: string;
  show_time: string;
  movie_name: string;
  movie_image: string;
  theater_name: string;
  theater_area: string;
  total_rows: number;
  total_columns: number;
  occupied_seats?: string[];
}

export const getDetailsByShowId = async (show_id: number): Promise<IShowDetails> => {
  try {
    const response = await api.get<{ success: boolean; data: IShowDetails }>(`/shows/${show_id}`);

    const data: IShowDetails = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching movies and shows:", error);
    throw error;
  }
};