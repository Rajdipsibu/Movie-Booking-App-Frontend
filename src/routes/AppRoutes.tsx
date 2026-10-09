import { Routes, Route } from "react-router-dom";
import Movies from "../pages/Movies";
import Login from "../pages/Login";
import MainLayout from "../components/layout/MainLayout";

import Register from "../pages/Register";
import AuthGuard from "./AuthGuard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import MovieDetails from "../pages/MovieDetails";
import MyBookings from "../pages/MyBookings";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/updateProfileForm";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import TheaterList from "../pages/Theater";
import TheaterShowtimes from "../pages/TheaterShowtimes";
import BookingPage from "../pages/bookingpage";
import SlotSelectionPage from "../pages/slotSelectionPage";
import PaymentPage from "../pages/payment";
import BookingSuccess from "../components/BookingSuccess";
import SeatSelection from "../pages/seatSelectionPage";
// import TheaterDropdown from "../components/movie/TheaterDropDown";

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route element={<MainLayout />}>
        <Route path="/" element={<Movies />} />
        <Route path= "/movies/:id"  element={<MovieDetails />} />
        
        <Route element={<AuthGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/update_profile" element={<UpdateProfile/>} />
          <Route path="/my_bookings" element={<MyBookings/>} />
          <Route path="/show/:show_id" element={<BookingPage/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>
          <Route path="/shows/:id" element={<TheaterShowtimes/>} />
          <Route path="/theater/:theaterId/movie/:movieId" element={<SlotSelectionPage />} />
          <Route path="/forgot_password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/theaters" element={<TheaterList/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
