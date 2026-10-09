import { useEffect, useState } from "react";
import { getUserDetails } from "../services/auth.service.js";
import { updateProfile } from "../services/auth.service.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserDetails().then((user) => {
      setFormData({
        name: user.name,
        email: user.email
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      navigate('/profile')
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>
        <label >User Name</label>
        <input
          type="text"
          placeholder="Username"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
        <label >DOB</label>
        <input
          type="date"
          onChange={(e) =>
            localStorage.setItem("dob",e.target.value)
          }
          className="w-full border px-3 py-2 rounded"
        />
        <label >Phone</label>
        <input
          type="text"
          onChange={(e) =>
            localStorage.setItem("Phone",e.target.value)
          }
          className="w-full border px-3 py-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
