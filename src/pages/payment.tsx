import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { makeBooking_confirm } from '../services/booking.service';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const { bookingId, selectedSeats, totalPrice, movieName, showTime, theaterName } = location.state || {};

  const handleFinalPayment = async () => {
    if (!bookingId) return toast.error("Booking reference missing");
    setIsProcessing(true);
    try {
      const res: any = await makeBooking_confirm(Number(bookingId));
      if (res.success) {
        toast.success("Ticket Confirmed! 🍿");
        navigate('/booking-success', { state: { ...location.state } });
      }
    } catch (error) {
      toast.error("Payment confirmation failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render the dynamic content based on selected method
  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'upi':
        return (
          <div className="animate-in fade-in duration-300">
            <h3 className="font-bold mb-6 text-gray-800 uppercase text-xs">Pay by UPI ID</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter UPI ID (e.g. username@bank)" 
                className="w-full border p-3 rounded-lg outline-none focus:border-red-500 transition-all"
              />
              <p className="text-[10px] text-gray-400">A payment request will be sent to your UPI app.</p>
            </div>
          </div>
        );
      case 'debit/credit card':
        return (
          <div className="animate-in fade-in duration-300 space-y-4">
            <h3 className="font-bold mb-4 text-gray-800 uppercase text-xs">Enter Card Details</h3>
            <input 
              type="text" 
              placeholder="Card Number" 
              className="w-full border p-3 rounded-lg outline-none focus:border-red-500"
            />
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Expiry (MM/YY)" 
                className="w-1/2 border p-3 rounded-lg outline-none focus:border-red-500"
              />
              <input 
                type="password" 
                placeholder="CVV" 
                className="w-1/2 border p-3 rounded-lg outline-none focus:border-red-500"
              />
            </div>
            <input 
              type="text" 
              placeholder="Name on Card" 
              className="w-full border p-3 rounded-lg outline-none focus:border-red-500"
            />
          </div>
        );
      case 'net banking':
        return (
          <div className="animate-in fade-in duration-300">
            <h3 className="font-bold mb-6 text-gray-800 uppercase text-xs">Select Your Bank</h3>
            <select className="w-full border p-3 rounded-lg outline-none focus:border-red-500 bg-white">
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  if (!bookingId) return <div className="p-20 text-center">Session Expired. Please re-book.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Section: Payment Options */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-lg font-bold">Payment options</h2>
          </div>
          <div className="flex flex-1">
            {/* Sidebar Methods */}
            <div className="w-1/3 border-r bg-gray-50">
              {['UPI', 'Debit/Credit Card', 'Net Banking'].map((method) => (
                <button 
                  key={method}
                  onClick={() => setPaymentMethod(method.toLowerCase())}
                  className={`w-full text-left p-4 text-sm font-medium border-b transition-colors ${
                    paymentMethod === method.toLowerCase() 
                    ? 'bg-white text-red-500 border-l-4 border-l-red-500' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
            {/* Dynamic Method Details */}
            <div className="flex-1 p-10 min-h-[300px]">
              {renderPaymentDetails()}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full md:w-96 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{movieName}</h2>
              <span className="text-red-500 text-xs font-bold">M-Ticket</span>
            </div>
            <p className="text-gray-500 text-xs">{theaterName}</p>
            <p className="text-gray-500 text-xs mb-4">Seats: {selectedSeats?.join(', ')}</p>
            <p className="text-gray-500 text-xs mb-4">Show Time: {showTime}</p>
            
            <div className="border-t border-dashed pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tickets Price</span>
                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Convenience fees</span>
                <span className="font-medium text-blue-500">₹{(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-4 border-t mt-4 bg-yellow-50 p-2">
                <span>Amount Payable</span>
                <span>₹{(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleFinalPayment}
            disabled={isProcessing}
            className="w-full bg-[#F84464] text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            {isProcessing ? "Confirming..." : `PROCEED TO PAY ₹${(totalPrice * 1.1).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;