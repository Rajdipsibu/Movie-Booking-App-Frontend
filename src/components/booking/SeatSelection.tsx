// import { useState } from "react";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { createBooking } from "../../services/booking.service";

// const BookingPage = () => {
  
//   const { show_id } = useParams();
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const ticketPrice = 250; // Base price per seat
//   const allSeats = [
//     'A1', 'A2', 'A3', 'A4', 'A5',
//     'B1', 'B2', 'B3', 'B4', 'B5',
//     'C1','C2','C3','C4','C5'
//   ];
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   // This automatically updates whenever selectedSeats changes
//   const totalAmount = selectedSeats.length * ticketPrice;

//   const handleSeatToggle = (seat: string) => {
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const handleInitialBooking = async () => {
//     setIsSubmitting(true);
//     const payload = {
//       show_id: Number(show_id), // Get from params
//       seats_booked: String(selectedSeats.join(',')), // Convert ["A1", "A2"] to "A1,A2"
//       total_price: Number(totalAmount)
//     };
//     try {
//       const res = await createBooking(payload);
//       if (res.success) {
//         toast.success("Booking created !");
//         navigate("/payment", { 
//           state: { 
//             bookingId: res.booking_id, // Ensure this matches your API response key
//             selectedSeats: selectedSeats, 
//             totalPrice: totalAmount,
//             // movieName: "Leo" // You should pass the actual movie name here
//           } 
//         });
//       } else {
//         toast.error(res.message || " created Booking failed");
//       }
//     } catch (error) {
//       toast.error("Error connecting to server");
//       console.log(error)
//     } finally {
//       setIsSubmitting(false);
//     }
    
//   };
//   return (
//   <div className="max-w-xl mx-auto p-6">
//     <div className="p-8 bg-gray-900 text-white rounded-xl">
//       <h2 className="text-xl font-bold mb-4">Select Seats</h2>
      
//       {/* Seat Selection Component */}
//       <div className="grid grid-cols-5 gap-2 mb-6">
//         {allSeats.map(seat => (
//           <button 
//             key={seat}
//             onClick={() => handleSeatToggle(seat)}
//             className={`p-2 rounded ${selectedSeats.includes(seat) ? 'bg-red-600' : 'bg-gray-700'}`}
//           >
//             {seat}
//           </button>
//         ))}
//       </div>

//       {/* Dynamic Price Display */}
//       <div className="border-t border-gray-700 pt-4">
//         <p>Selected: <span className="text-red-500">{selectedSeats.join(', ') || 'None'}</span></p>
//         <div className="border-t border-gray-700 pt-4">
//         <p>Total: <span className="text-2xl font-bold">₹{totalAmount}</span></p>
//         <button 
//           onClick={handleInitialBooking}
//           disabled={selectedSeats.length === 0 || isSubmitting}
//           className="w-full mt-4 bg-green-600 py-3 rounded-lg font-bold disabled:opacity-50"
//         >
//           {isSubmitting ? "Processing..." : "Proceed to Payment"}
//         </button>
//       </div>
        
//       </div>
//     </div>
//   </div>
//   );
// };

// export default BookingPage;
import React, { useState } from 'react';

const SeatSelection = ({ rows, cols, bookedSeats, onConfirm }: { 
  rows: number, 
  cols: number, 
  bookedSeats: string[], 
  onConfirm: (seats: string[]) => void 
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (row: number, col: number) => {
    // Generate label (A1, B2, etc.)
    const seatLabel = `${String.fromCharCode(65 + (rows - 1 - row))}${col + 1}`;
    setSelectedSeats(prev => 
      prev.includes(seatLabel) ? prev.filter(s => s !== seatLabel) : [...prev, seatLabel]
    );
  };

  // Helper to determine category based on row
  const getCategory = (rowIndex: number) => {
    return rowIndex === 0 ? { label: "₹600 RECLINER", color: "text-gray-500" } : { label: "₹230 CLASSIC", color: "text-gray-500" };
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full py-10 font-sans text-gray-800">
      
      {/* 1. Header Information (From Screenshot) */}
      <div className="w-full max-w-4xl px-6 mb-8 border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">DSP Dev 2 - (Punjabi)</h1>
            <p className="text-sm text-gray-500">PVR: Elante, Chandigarh | Fri, 13 Feb, 09:00 AM</p>
          </div>
          <button className="border border-red-400 text-red-500 px-4 py-1 rounded text-sm font-medium">
             {selectedSeats.length || 0} Tickets
          </button>
        </div>
      </div>

      {/* 2. Time Slot Quick Switch (From Screenshot) */}
      <div className="flex gap-4 mb-12">
        {['09:00 AM', '02:45 PM', '08:30 PM'].map(time => (
          <button 
            key={time}
            className={`px-6 py-1 rounded border text-sm ${time === '09:00 AM' ? 'bg-green-600 border-green-600 text-white' : 'border-green-600 text-green-600'}`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* 3. Seat Grid Section */}
      <div className="w-full overflow-x-auto flex flex-col items-center px-4">
        {[...Array(rows)].map((_, r) => (
          <React.Fragment key={r}>
            {/* Category Header */}
            {(r === 0 || r === 1) && (
              <div className="w-full max-w-2xl border-b my-6 flex justify-center">
                <span className={`text-[10px] font-bold tracking-widest bg-white px-4 -mb-2 ${getCategory(r).color}`}>
                  {getCategory(r).label}
                </span>
              </div>
            )}

            <div className="flex items-center gap-6 mb-2">
              {/* Row Label (Left) */}
              <span className="text-[10px] text-gray-400 w-4">{String.fromCharCode(65 + (rows - 1 - r))}</span>
              
              <div className="flex gap-1.5">
                {[...Array(cols)].map((_, c) => {
                  const label = `${String.fromCharCode(65 + (rows - 1 - r))}${c + 1}`;
                  const isSelected = selectedSeats.includes(label);
                  const isBooked = bookedSeats.includes(label);

                  return (
                    <button
                      key={label}
                      disabled={isBooked}
                      onClick={() => toggleSeat(r, c)}
                      className={`w-7 h-7 rounded-sm text-[9px] font-medium border transition-all flex items-center justify-center
                        ${isBooked 
                          ? 'bg-gray-200 border-gray-200 text-transparent cursor-not-allowed' 
                          : isSelected 
                            ? 'bg-green-600 border-green-600 text-white shadow-md' 
                            : 'bg-white border-green-600 text-green-600 hover:bg-green-50'
                        }`}
                    >
                      {c + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* 4. Custom Legend (Matching Screenshot) */}
      <div className="flex gap-8 mt-16 py-4 px-10 bg-gray-50 rounded-full border border-gray-100 text-[11px] font-medium text-gray-500">
        <div className="flex items-center gap-2"><span className="w-4 h-4 bg-white border border-green-600 rounded-sm"></span> Available</div>
        <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-600 rounded-sm"></span> Selected</div>
        <div className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-200 rounded-sm"></span> Sold</div>
      </div>

      {/* 5. Floating Action Bar (Bottom) */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4 flex justify-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onConfirm(selectedSeats)}
          className="bg-[#F84464] text-white px-20 py-3 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-30 disabled:grayscale"
          disabled={selectedSeats.length === 0}
        >
          Pay ₹{selectedSeats.length * (selectedSeats[0]?.startsWith('L') ? 600 : 230)}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;