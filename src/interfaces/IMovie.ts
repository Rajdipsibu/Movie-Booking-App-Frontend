export interface IMovie {
  id?: number;
  name: string;
  description: string; // ISO string from backend
  image: string;
  duration?: number;     // comes as string from MySQL
  price: number;
   rating?: number;
   release_date?:string;
   status?:string;
}
export interface IPaginatedMovies {
  page: number;
  limit: number;
  totalMovies: number;
  totalPages: number;
  data: IMovie[];
}