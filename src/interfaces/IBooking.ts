export interface IBooking {
  movie_id:number;
  seat_row:string;
  seat_col:number;
  booking_date:string;
  total_amount :number;
}

export interface IBookingResponse{
  message:string;
  id:number;
}



///
export interface BookingMovie {
  book_id: number;
  booking_date: string;     // ISO string
  total_amount: string;     // comes as string from backend
  MovieID: number;
  Title: string;
  Genre: string;
  ReleaseDate: string;      // ISO string
}

export interface BookingMovieResponse {
  booking_movie: BookingMovie[];
}

//
export interface IBookingDetails {
  booking_id: number;
  seats: string;
  total_price: string;
  booking_time: string;
  booking_status:string;
  movie_name: string;
  movie_image: string;
  show_date: string;
  show_time: string;
  theater_name: string;
  theater_location: string;
}
