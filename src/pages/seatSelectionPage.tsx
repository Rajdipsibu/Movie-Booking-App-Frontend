import React, { useState } from 'react';

const CATEGORIES = [
  { label: "₹600 RECLINER", rows: ["L"], price: 600 },
  { label: "₹230 CLASSIC", rows: ["K", "J", "H", "G", "F", "E", "D", "C", "B", "A"], price: 230 }
];

interface SeatSelectionProps {
  movieName: string;
  theaterName: string;
  theaterArea: string;
  showTime: string;
  showDate: string;
  bookedSeats: string[];
  onConfirm: (seats: string[], totalPrice: number) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ 
  movieName, theaterName, theaterArea, showTime, showDate, bookedSeats, onConfirm 
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const rowLetter = seat.charAt(0);
      const category = CATEGORIES.find(cat => cat.rows.includes(rowLetter));
      return total + (category?.price || 0);
    }, 0);
  };

  const toggleSeat = (label: string) => {
    setSelectedSeats(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full pb-24 font-sans text-gray-800">
      
      {/* Dynamic Header */}
      <div className="w-full bg-white border-b sticky top-0 z-20 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight">{movieName}</h1>
            <p className="text-xs text-gray-500">
              {theaterName}: {theaterArea} | {new Date(showDate).toDateString()}, {showTime.slice(0, 5)}
            </p>
          </div>
          <div className="border border-gray-300 px-4 py-1 rounded text-sm font-bold">
            {selectedSeats.length} Tickets
          </div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-2xl px-4 select-none">
        {CATEGORIES.map((cat, catIdx) => (
          <div key={catIdx} className="mb-10">
            <div className="border-b border-gray-200 mb-6 flex justify-start">
              <span className="text-[10px] font-bold text-gray-400 pb-1 uppercase tracking-widest">
                {cat.label}
              </span>
            </div>

            <div className="space-y-2">
              {cat.rows.map(row => (
                <div key={row} className="flex items-center gap-6">
                  <span className="w-4 text-[10px] text-gray-400 font-bold">{row}</span>
                  <div className="flex gap-2 flex-1 justify-center">
                    {[...Array(12)].map((_, i) => { // Use dynamic col count if needed
                      const seatNum = (i + 1).toString().padStart(2, '0');
                      const label = `${row}${seatNum}`;
                      const isSelected = selectedSeats.includes(label);
                      const isBooked = bookedSeats.includes(label);

                      return (
                        <button
                          key={label}
                          disabled={isBooked}
                          onClick={() => toggleSeat(label)}
                          className={`w-7 h-7 rounded-sm text-[9px] border transition-all flex items-center justify-center
                            ${isBooked 
                              ? 'bg-gray-100 border-gray-100 text-transparent cursor-not-allowed' 
                              : isSelected 
                                ? 'bg-green-600 border-green-600 text-white shadow-md' 
                                : 'bg-white border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                            }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer & Legend */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4 flex flex-col items-center shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex gap-8 mb-4 text-[11px] font-medium text-gray-500">
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-white border border-green-600 rounded-sm"></span> Available</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-600 rounded-sm"></span> Selected</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-100 rounded-sm"></span> Sold</div>
        </div>

        <button 
          onClick={() => onConfirm(selectedSeats, calculateTotal())}
          className="bg-[#F84464] text-white px-24 py-3 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-30"
          disabled={selectedSeats.length === 0}
        >
          Pay ₹{calculateTotal()}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;