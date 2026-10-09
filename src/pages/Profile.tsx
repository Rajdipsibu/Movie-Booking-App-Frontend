import { useEffect, useState } from "react";
import { getUserDetails } from "../services/auth.service";
import { Link } from "react-router-dom";
import type { IUser } from "../interfaces/IUser";
import MyBookings from "./MyBookings";

// interface IUser {
//   id?:number;
//   name: string;
//   email: string;
//   joinedAt?: string;
//   is_verified?: boolean;
// }

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    getUserDetails()
    .then((res)=>{
      setUser(res);
    })
    .catch(()=>{
      <p>Failed to load profile</p>
    }).finally(()=>setLoding(false))
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">

        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-4">
          <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.name}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Date of Birth</p>
            <p className="text-lg  text-gray-800">
              {localStorage.getItem("dob")}
            </p>
            <hr />
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="text-lg  text-gray-800">
              {localStorage.getItem("Phone")}
            </p>
            <hr />
            <p className="text-gray-500 text-sm">Joined On</p>
            <p className="text-lg font-semibold text-gray-800">
              {user?.created_at?.split('T')[0]}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Verified</p>
            <p className="text-lg font-semibold text-green-600">
              {!user?.is_verified && " You Are verified "}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Link to="/update_profile"
            className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition cursor-pointer"
          >
            Edit Profile
          </Link>

          {/* <Link
            // onClick={() => {
            //   localStorage.clear();
            //   window.location.href = "/login";
            // }}
            to="/my_bookings"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Booking History
          </Link> */}

        </div>

      </div>
    </div>
  );
};

export default Profile;
