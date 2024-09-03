import { Address, AddressListResponse, UserResponse } from "@/types/auth.type";
import api1 from "./apis/api1";
import { BaseService } from "./apis/base.service";

interface Customer {
  name: string;
  email: string;
  password: string;
  role: string;
  address: any;
  contactNumber: string;
  orders: any[]; // Assuming orders is an array, but you can specify the actual type if known
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

interface CreateCustomerResponse {
  success: boolean;
  message: string;
  customer: Customer;
}
interface BranchAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Branch {
  _id: string;
  name: string;
  number: string;
  email: string;
  password: string;
  restaurantId: string;
  products: any[]; // Assuming products is an array of unknown objects; replace `any` with a specific type if known
  address: BranchAddress;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface BranchListResponse {
  success: boolean;
  message: string;
  branch: Branch[];
}

class AuthService extends BaseService {
  verfiyEamil = async (
    email: string
  ): Promise<{
    isUserExist: boolean;
    data: {
      token: string;
    };
  }> => {
    let url = "/user/isUserExist";
    try {
      let { data } = await api1.post(url, {
        email: email,
      });
      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  createUser = async (payload: {
    name: string;
    email: string;
    password: string;
    number: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
  }): Promise<CreateCustomerResponse> => {
    let url = "/user/create";
    try {
      let { data } = await api1.post(url, payload);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  getAddress = async (): Promise<AddressListResponse> => {
    let url = "address/addressList";
    try {
      let data = await api1.get(url);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  createOrder = async (payload: {
    name: string;
    product_id: string;
    payment_method: string;
    customer_id: string; // ObjectId for User
    addressId: string; // ObjectId for Address
    ordertype: "PAID" | "COD"; // Enum for order types
    quantity: number;
  }): Promise<AddressListResponse> => {
    let url = "order/placeOrder";
    try {
      let { data } = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  searchProduct = async (payload: { searchText: "cake" }) => {
    let url = "product/searchProduct";
    try {
      let { data } = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async (): Promise<UserResponse> => {
    let url = "/user/getUser";
    try {
      let data = await api1.get(url);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  addAddress = async (payload: {
    name: string;
    addressType: string; // enum [ "Home","Work","Other"]
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }): Promise<UserResponse> => {
    let url = "/address/addAddress";
    try {
      let data = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  getOrdersToken = async (payload: {
    amount: string;
    currency: string;
    reciept: any;
  }) => {
    let url = "/user/createRazerpayOrder";
    try {
      let { data } = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      console.log(err);
    }
  };

  submitOrderResponse = async (payload: {
    amount: string;
    currency: string;
    reciept: any;
  }) => {
    let url = "payment/orders";
    try {
      let { data } = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      console.log(err);
    }
  };
  getAllBranches = async (): Promise<BranchListResponse> => {
    let url = "branch/getAllBranch";
    try {
      let data = await api1.get(url);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
      // console.log(err);
    }
  };

  successOrderResponse = async (payload: {
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
  }): Promise<{
    status: boolean;
    message: string;
    data: any;
  }> => {
    let url = "user/razerpayPayementSuccess";

    try {
      let { data } = await api1.post(url, payload);
      return data as any;
    } catch (err) {
      throw new Error(err as any);
      // console.log(err);
    }
  };
  // getAddress = async (): Promise<Array<Address>> => {
  //   let url = "/address/addressList";
  //   try {
  //     let data = await api1.get(url);
  //     return data as any;
  //   } catch (err) {
  //     throw new Error(err as any);
  //   }
  // };
  adminLogin = async (payload: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    message: string;
    token: string;
  }> => {
    let url = "/user/login";
    try {
      let { data } = await api1.post(url, payload);
      console.log(data);
      return data as any;
    } catch (err) {
      console.log(err);
      //@ts-ignore
      throw new Error(err);
    }
  };

  profileEdit = async (payload: {
    name: string;
    contactNumber: number;
  }): Promise<{
    status: boolean;
    message: string;
    data: any;
  }> => {
    let url = "user/editUser";
    try {
      let { data } = await api1.post(url, payload);
      console.log(data);
      return data as any;
    } catch (err) {
      console.log(err);
      //@ts-ignore
      throw new Error(err);
    }
  };

  submitOtp = async (
    payload: { otp: string },
    token?: string
  ): Promise<{
    success: string;
    message: string;
    status: boolean;
  }> => {
    let url = "user/emailVerifyOtp";
    try {
      let { data } = await api1.post(url, payload, token);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  //   verfiyEamil = async (
  //     email: string
  //   ): Promise<{
  //     isverified: boolean;
  //   }> => {
  //     let url = "/email/verify";
  //     try {
  //       let { data } = await api1.post(url, {
  //         email: email,
  //       });
  //       return data as any;
  //     } catch (err) {
  //       throw new Error(err as any);
  //     }
  //   };
}

export default AuthService;
