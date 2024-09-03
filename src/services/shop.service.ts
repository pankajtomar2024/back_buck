import {
  CategoryListResponse,
  OrdersResponse,
  ProductListResponse,
} from "@/types/shop.type";
import { BaseService } from "./apis/base.service";
import api1 from "./apis/api1";

interface Product {
  ratings: {
    averageRating: number;
    numberOfReviews: number;
  };
  _id: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  category: string;
  ingredients: string[];
  image: string;
  stock: number;
  sku: string;
  isAvailable: boolean;
  branchAvailability: Record<string, any>; // Assuming this is an object, you can define the exact structure if known
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProductResponse {
  message: string;
  data: Product;
  status: boolean;
}

class ShopService extends BaseService {
  ProductList = async (): Promise<CategoryListResponse> => {
    let url = "/product/productList";
    try {
      let data = await api1.get(url);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  getProduct = async (id: string): Promise<ProductResponse> => {
    let url = "product/getProductById";
    try {
      let { data } = await api1.post(url, { _id: id });

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  getOrders = async (): Promise<OrdersResponse> => {
    let url = "order/orderList";
    try {
      let data = await api1.get(url);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  getProfile = async (): Promise<ProductResponse> => {
    let url = "order/orderList";
    try {
      let { data } = await api1.get(url);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  CategoryList = async (): Promise<ProductListResponse> => {
    let url = "/category/categoryList";
    try {
      let data = api1.get(url);

      return data as any;
    } catch (err) {
      throw new Error(err as any);
    }
  };
}

export default ShopService;
