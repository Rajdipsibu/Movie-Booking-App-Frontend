// import { useState } from "react";
// import api from "../services/api";
// import toast from "react-hot-toast";

// export const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const submit = async () => {
//     await api.post("/users/forgot_password", { email });
//     toast.success("Reset link sent 📧");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <input
//         type="email"
//         placeholder="Enter your email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="border w-full p-2"
//       />
//       <button onClick={submit} className="mt-4 bg-red-500 text-white p-2 w-full">
//         Send Reset Link
//       </button>
//     </div>
//   );
// };
