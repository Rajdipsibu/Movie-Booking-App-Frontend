import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submit = async () => {
    await api.post(`/users/reset_password`, { token , password });
    alert("Password updated 🎉");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full p-2"
      />
      <button onClick={submit} className="mt-4 bg-green-500 text-white p-2 w-full">
        Reset Password
      </button>
    </div>
  );
};
