export interface Loginreq {
  email: string;
  password: string;
}

export interface BaseResponse {
  success: boolean;
  message: string;
}
export interface LoginResponse {
  success: boolean;
  token: string;
  admin: Admin;
  role: string;
}

export interface Admin {
  adminBranch: string;
  _id: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRole: string;
  adminPhone: string;
  adminAddress: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  adminOtp: string;
}

export interface Address {
  _id: string;
  name: string;
  addressType: string;
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isDefault?: boolean;
}

export interface AddressListResponse {
  success: boolean;
  message: string;
  length: number;
  address: Address[];
}

export interface User {
  address: Address[];
  _id: string;
  name: string;
  email: string;
  role: string;
  contactNumber: string;
  orders: any[]; // Adjust the type of orders based on its structure if needed
}

export interface UserResponse {
  status: boolean;
  message: string;
  user: User;
}
