import type { ILoginForm, ILoginResponse, IUser,  IUserResponse, RegisterPayload, RegisterResponse } from "../interfaces/IUser";
import api from "./api";

//Registration :
export const registerUser = async (data:RegisterPayload):Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(`/users/registration`,data);
    return response.data;
  } catch (error) {
    console.error("Error registration:", error);
    throw error;
  }
};

//Login:
export const loginUser = async(data:ILoginForm) => {
  try{
    const response = await api.post<ILoginResponse>('/users/login',data);
    return response.data.token
  }catch(e){
    console.error("Error login:", e);
    throw e;
  }
}

//forgot password:
export const forgotPassword = async (email:string) => {
  const res = await api.post("/users/fpassword",{email:email});
  return res.data;
};

// otp verified:
export const verifyOtp = async (data: {
  email: string;
  otp: string;
}) => {
  const res = await api.post("/users/otp_verify", data);
  return res.data;
};

//get user details by user id:
export const getUserDetails = async():Promise<IUser>=>{
  try{
    const res = await api.get('/users/');
    return res.data.row[0];
  }catch(e){
    console.error("Error getUser Details:", e);
    throw e;
  }
}

//update profile
export const updateProfile = async (data: {
  name: string;
  email: string;
}) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};