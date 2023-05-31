
import { City, FetchResponse, Sort, cartResponse } from "../type";
import { decodeTokenFromCookie } from "../utils";
import { userInit } from "./props";


interface RestaurantInitialState {
  value: FetchResponse[];
  sort: Sort;
  total: number;
  loading :boolean
}

export const cityInitialState: { value: City,showCityModel:boolean } = {
  value: "Bangalore",
  showCityModel:false
};
export const restaurantInitialState: RestaurantInitialState = {
  value: [],
  sort: "rel",
  total: 0,
  loading:true
};
export const cartInitialState: {
  total_price: number;
  total: number;
  warring: boolean;
  carts:cartResponse|null|undefined
} = {
  total_price: 0,
  total: 0,
  warring: false,
  carts:null
};
export const searchInitialState:{value:FetchResponse[],loading:boolean} = {
value:[],
loading:false,
}
export const userInitialState : userInit= {
  name : decodeTokenFromCookie("jwtToken")?.name ||"",
  data:{},
  loginError:"",
  favorite:[],
  email:decodeTokenFromCookie("jwtToken")?.email ||"",
  orders:[],
  address:[],
  showAddress:false,
  selectedAddress_id:"",
}