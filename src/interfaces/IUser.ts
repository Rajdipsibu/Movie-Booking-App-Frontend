///========register=======
export interface RegisterPayload {
  name?: string;
  username?: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId?: number;
}
///==========login========
export interface ILoginForm{
  email:string;
  password:string;
}

export interface ILoginResponse{
  message:string;
  token:string;
}

///==============
export interface IUser {
  id: number;
  name: string;
  email: string;
  is_verified?:boolean;
  created_at?:String;
}
export interface IUserResponse {
  row: IUser;
}