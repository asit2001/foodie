import { Address } from "cluster";
import { City, Order, Sort,Addresses } from "../type";

type method =  "GET" | "DELETE" | "POST"

export interface OrderPops {
  cart_id?: string;
  method:method;
}
export interface FavoritesProps {
  restaurant_id?: string;
  method:method
}
export interface CartProps {
  restaurant_id?: string;
  menu_id?: string;
  opType: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface RegisterProps extends LoginProps {
  name: string;
}
export interface RestaurantProps {
  city: City;
  page?: number;
  sort: Sort;
}
export interface ProductProps {
  city: City;
  query: string;
}
export interface AddressProps extends Partial<Exclude< Addresses,"_id">>{
  method :method;
  address_id?:string
};
export type userInit = {
  name: string;
  data: Object;
  loginError: string;
  favorite: FetchResponse[];
  email: string;
  orders:Order[];
  address:Addresses[];
  showAddress:boolean;
  selectedAddress_id:string;
};
