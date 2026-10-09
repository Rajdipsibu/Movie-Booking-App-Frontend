import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieName, selectedSeats, totalPrice, showDate, showTime, theaterName } = location.state || {};

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col items-center py-10 px-6 font-sans">
      
      {/* 1. Celebration Header */}
      <div className="mb-8 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Booking Successful!</h1>
        <p className="text-gray-500 text-sm">Your ticket has been sent to your email & phone</p>
      </div>

      {/* 2. Realistic Ticket Graphic */}
      <div className="max-w-sm w-full bg-white rounded-t-[40px] rounded-b-3xl shadow-2xl relative overflow-hidden border border-gray-100">
        
        {/* Movie Header Image (Optional/Placeholder) */}
        <div className="h-32 bg-gradient-to-br from-red-600 to-red-800 p-8 flex items-end">
           <h2 className="text-white text-2xl font-black uppercase leading-tight drop-shadow-md">
             {movieName || "Movie Ticket"}
           </h2>
        </div>

        {/* Ticket Details */}
        <div className="p-8 space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Cinema</p>
              <p className="text-sm font-bold text-gray-800">{theaterName || "PVR Nexus Mall"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Language</p>
              <p className="text-sm font-bold text-gray-800">Hindi 2D</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Date & Time</p>
              <p className="text-sm font-bold text-gray-800">
                {showDate ? new Date(showDate).toDateString() : "Fri, 13 Feb"} | {showTime?.slice(0, 5) || "09:00 AM"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Seats</p>
              <p className="text-sm font-bold text-red-600">{selectedSeats?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Realism: The Perforation Line */}
        <div className="relative h-6 flex items-center">
          <div className="absolute -left-3 w-6 h-6 bg-[#F2F2F2] rounded-full border-r border-gray-100"></div>
          <div className="w-full border-t-2 border-dashed border-gray-200 mx-4"></div>
          <div className="absolute -right-3 w-6 h-6 bg-[#F2F2F2] rounded-full border-l border-gray-100"></div>
        </div>

        {/* Bottom Section: QR Code Area */}
        <div className="bg-gray-50 p-8 flex flex-col items-center">
          <div className="w-36 h-36 bg-white p-2 rounded-xl border border-gray-200 shadow-inner flex items-center justify-center">
             {/* Replace with a real QR generator library icon if needed */}
             <div className="w-full h-full bg-slate-100 rounded flex flex-col items-center justify-center opacity-40">
                <div className="grid grid-cols-4 gap-1">
                   {[...Array(16)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                   ))}
                </div>
             </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 font-mono tracking-widest uppercase">
            Booking ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="mt-10 flex flex-col gap-3 w-full max-w-sm">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#F84464] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Go to Homepage
        </button>
        <button 
          onClick={() => navigate('/my_bookings')}
          className="w-full bg-white text-gray-700 py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-all"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;