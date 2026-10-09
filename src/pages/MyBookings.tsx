import { useEffect, useState } from "react";
import { cancelBooking, getMyBookings } from "../services/booking.service";
import type { IBookingDetails } from "../interfaces/IBooking";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState<IBookingDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings()
      .then((data) => {
        // Correctly set the bookings array from the API data
        setBookings(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );

  const handleCancelBooking = (bookingId: number) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex flex-col p-4 border border-gray-100 mx-auto items-center justify-center`}
        >
          <div className="flex-1 px-2 py-2">
            <p className="text-sm font-bold text-gray-900">Cancel Ticket?</p>
            <p className="mt-1 text-xs text-gray-500">
              Are you sure you want to cancel this booking?
            </p>
          </div>
          <div className="flex border-t border-gray-100 mt-4 pt-3 gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await executeCancellation(bookingId); // Call the actual API logic
              }}
              className="flex-1 bg-red-600 text-white text-xs py-2 rounded-lg font-black uppercase hover:bg-red-700 transition-colors"
            >
              Yes, Cancel
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 bg-gray-100 text-gray-700 text-xs py-2 rounded-lg font-bold uppercase hover:bg-gray-200 transition-colors"
            >
              Keep Ticket
            </button>
          </div>
        </div>
      ),
      { duration: 2000 },
    ); // Keeps it visible until a button is clicked
  };

  const executeCancellation = async (bookingId: number) => {
    try {
      const res = await cancelBooking(bookingId);
      if (res.success) {
        toast.success("Booking cancelled successfully! 🎟️");

        // Update the local state instead of filtering
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.booking_id === bookingId
              ? { ...b, booking_status: "cancelled" } // Update the status here
              : b,
          ),
        );
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Network error. Please try again later.");
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-black min-h-screen text-white">
        <p className="text-xl">No bookings found 🎟️</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8 border-l-4 border-red-600 pl-4 uppercase">
          My Tickets
        </h1>

        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.booking_id}
              className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-transform hover:scale-[1.01]"
            >
              {/* Movie Image */}
              <div className="md:w-32 bg-gray-800">
                <img
                  src={`./src/assets/movies/${b.movie_image}`}
                  alt={b.movie_name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-red-500 uppercase">
                      {b.movie_name}
                    </h2>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${
                        b.booking_status === "confirmed"
                          ? "bg-green-900/30 text-green-400 border-green-800"
                          : "bg-gray-800 text-gray-400 border-gray-700"
                      }`}
                    >
                      {b.booking_status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {b.theater_name}, {b.theater_location}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-800">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Show Date
                    </p>
                    <p className="text-sm">
                      {new Date(b.show_date).toDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Time
                    </p>
                    <p className="text-sm font-mono">
                      {b.show_time.slice(0, 5)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">
                      Seats
                    </p>
                    <p className="text-sm text-red-400 font-bold">{b.seats}</p>
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-gray-800/50 p-6 flex flex-col items-center justify-center border-l border-gray-800 min-w-[120px]">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Total Paid
                </p>
                <p className="text-2xl font-black text-white">
                  ₹{b.total_price}
                </p>
                {["confirmed", "pending"].includes(b.booking_status) && (
                  <button
                    onClick={() => handleCancelBooking(b.booking_id)}
                    className="mt-4 text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-widest border border-red-500/30 px-3 py-1 rounded-lg transition-colors"
                  >
                    Cancel Ticket
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
