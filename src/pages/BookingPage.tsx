import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailsByShowId, type IShowDetails } from "../services/show.services";
import SeatSelection from "../pages/seatSelectionPage"; // Ensure path is correct
import { createBooking, getBookedSeatsByShowId } from "../services/booking.service";
import toast from "react-hot-toast";

const BookingPage = () => {
  const navigate = useNavigate();
  const { show_id } = useParams<{ show_id: string }>();
  const [showData, setShowData] = useState<IShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (!show_id) return;

    let isMounted = true;
    setLoading(true);

    // 1. Fetch show details and initial booked seats
    const loadShowAndSeats = async () => {
      try {
        const data = await getDetailsByShowId(Number(show_id));
        if (!isMounted) return;
        setShowData(data);

        if (data.occupied_seats && Array.isArray(data.occupied_seats)) {
          setBookedSeats(data.occupied_seats);
        } else {
          const seats = await getBookedSeatsByShowId(Number(show_id));
          if (isMounted) setBookedSeats(seats);
        }
      } catch (err) {
        console.error("Failed to load show details", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadShowAndSeats();

    // 2. Real-time polling: Refresh occupied seats every 4 seconds
    const interval = setInterval(async () => {
      try {
        const seats = await getBookedSeatsByShowId(Number(show_id));
        if (isMounted) setBookedSeats(seats);
      } catch (e) {
        // silent fail on background poll
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [show_id]);

  const handleSeatConfirmation = async (selectedSeats: string[], totalAmount: number) => {
    try {
      const payload = {
        show_id: Number(show_id),
        seats_booked: selectedSeats.join(','),
        total_price: totalAmount
      };

      const res = await createBooking(payload);

      if (res.success) {
        toast.success("Booking created! Proceeding to payment...");
        navigate("/payment", { 
          state: { 
            bookingId: res.booking_id,
            selectedSeats: selectedSeats, 
            totalPrice: totalAmount,
            movieName: showData?.movie_name,
            showTime: showData?.show_time,
            theaterName: showData?.theater_name
          } 
        });
      }
    } catch (error: any) {
      console.error("Booking creation failed", error);
      const serverMessage = error?.response?.data?.message || "Booking failed! Seats might already be booked.";
      toast.error(serverMessage, { duration: 4000 });

      // Update occupied seats from server response or refetch immediately
      if (error?.response?.data?.occupiedSeats) {
        setBookedSeats(error.response.data.occupiedSeats);
      } else {
        const latestSeats = await getBookedSeatsByShowId(Number(show_id));
        setBookedSeats(latestSeats);
      }
    }
  };

  if (loading) return <div className="text-center p-20">Loading Seating Layout...</div>;
  if (!showData) return <div className="text-center p-20">Show details not found.</div>;

  return (
    <div className="bg-white">
       <SeatSelection 
          movieName={showData.movie_name}
          theaterName={showData.theater_name}
          theaterArea={showData.theater_area}
          showTime={showData.show_time}
          showDate={showData.show_date}
          bookedSeats={bookedSeats}
          onConfirm={handleSeatConfirmation}
       />
    </div>
  );
};
export default BookingPage;