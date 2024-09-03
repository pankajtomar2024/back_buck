import { Address } from "./auth.type";

export interface Category {
  title: string;
  image: string;
  _id: string;
}
export interface Product {
  ratings: {
    averageRating: number;
    numberOfReviews: number;
  };
  quantity: number;
  veg: boolean;
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  ingredients: string[];
  image: string;
  stock: number;
  sku: string;
  isAvailable: boolean;
  branchAvailability: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductListResponse {
  status: boolean;
  message: string;
  dataLenght: number;
  product: Product;
}
export interface CategoryListResponse {
  status: boolean;
  message: string;
  dataLenght: number;
  category: Category;
}
interface CartData {
  productId: Product;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  userId: string;
  cartData: CartData[];
  orderId: string;
  payment_method: string;
  status: string;
  addressId: Address;
  ordertype: string;
  total_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  length: number;
  order: Order[];
}
