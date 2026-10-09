import type { IBooking, IBookingResponse } from "../interfaces/IBooking";
import api from "./api";

//create a movie Booking  :
export interface IBookingRequest {
  show_id: number;
  seats_booked: string;
  total_price: number;
}
//only create book
export const createBooking = async (bookingData: IBookingRequest) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};
//delete the booking softdelete:
export const cancelBooking = async (id:number): Promise<{success:string,message:string}> => {
  try {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error cancel movies:", error);
    throw error;
  }
};

//get booking details
import type { IBookingDetails } from "../interfaces/IBooking";

export const getMyBookings = async (): Promise<IBookingDetails[]> => {
  const res = await api.get("/bookings/my");
  // Your API returns the array inside "data"
  return res.data.data; 
};

//only here  we change the booking status pending to confirmed
export const makeBooking_confirm = async (id:number): Promise<void> => {
  const res = await api.post("/bookings/payment",{id});
  // Your API returns the array inside "data"
  return res.data; 
};

//fetch currently booked seats for a show
export const getBookedSeatsByShowId = async (showId: number): Promise<string[]> => {
  try {
    const res = await api.get(`/bookings/shows/${showId}/booked-seats`);
    return res.data.bookedSeats || [];
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    return [];
  }
};