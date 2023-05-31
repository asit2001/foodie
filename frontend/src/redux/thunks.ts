import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CART__THUNKS,
  GET_RESTAURANT_THUNK,
  SEARCHED_PRODUCT_THUNK,
  USER_LOGIN_THUNK,
  USER_REGISTER_THUNK,
  expireUser,
  FAVORITE_THUNKS,
  USER_LOGOUT_THUNK,
  clearCart,
  ORDER_THUNKS,
  ADDRESS_THUNKS,
} from ".";
import axios, { AxiosResponse } from "axios";
import { Addresses, FetchResponse, Order, cartResponse } from "../type";
import { generateURL, searchParams } from "../utils";
import {
  OrderPops,
  CartProps,
  FavoritesProps,
  LoginProps,
  RegisterProps,
  RestaurantProps,
  ProductProps,
  AddressProps,
} from "./props";
axios.defaults.withCredentials = true;

export const getRestaurantsThunks = createAsyncThunk(
  GET_RESTAURANT_THUNK,
  async ({ city, page, sort }: RestaurantProps) => {
    let pathname = `/api/restaurant/city/${city}`;
    let params: searchParams = [{ key: "sort", val: sort }];
    if (page) {
      params.push({ key: "page", val: page });
    }
    let url = generateURL(pathname, params);
    let res = (await axios.get(url)).data as {
      data: FetchResponse[];
      total: number;
    };
    return { ...res, page: !!page };
  }
);

export const getSearchedProductThunks = createAsyncThunk(
  SEARCHED_PRODUCT_THUNK,
  async ({ city, query }: ProductProps) => {
    let url = generateURL("/api/search", [
      { key: "city", val: city },
      { key: "query", val: query },
    ]);
    let res = (await axios.get<any, AxiosResponse<FetchResponse[]>>(url)).data;
    return res;
  }
);
export const logInThunk = createAsyncThunk(
  USER_LOGIN_THUNK,
  async ({ email, password }: LoginProps) => {
    let url = generateURL("/api/user/login");
    try {
      let response = await axios.post(url, {
        email,
        password,
      });
      return {
        data: response.data,
      };
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  USER_LOGOUT_THUNK,
  async (_, { dispatch }) => {
    let url = generateURL("/api/user/logout");
    await axios.delete(url);
    dispatch(clearCart());
    return null;
  }
);

export const RegisterThunks = createAsyncThunk(
  USER_REGISTER_THUNK,
  async ({ email, name, password }: RegisterProps) => {
    let url = generateURL("/api/user/signup");
    await axios.post(url, {
      email,
      name,
      password,
    });
  }
);
export const cartThunk = createAsyncThunk(
  CART__THUNKS,
  async ({ restaurant_id, menu_id, opType }: CartProps, { dispatch }) => {
    try {
      let url = generateURL("/api/user/cart");
      if (opType === "get") {
        let carts = await axios.get(url);

        return carts.data as cartResponse;
      }

      if (opType === "inc") {
        let carts = await axios.post(url, {
          restaurant_id,
          menu_id,
        });
        return carts.data as cartResponse;
      }
      let carts = await axios.delete(url, {
        data: {
          restaurant_id,
          menu_id,
        },
      });
      return carts.data as cartResponse;
    } catch (error) {
      dispatch(expireUser());
      throw error;
    }
  }
);

export const favoriteThunks = createAsyncThunk(
  FAVORITE_THUNKS,
  async ({ restaurant_id, method }: FavoritesProps) => {
    let url = generateURL("/api/user/favorite");
    let response;
    if (method === "POST") {
      response = await axios.post(url, {
        restaurant_id,
      });
    } else if (method === "GET") {
      response = await axios.get(url);
    } else {
      response = await axios.delete(url, {
        data: {
          restaurant_id,
        },
      });
    }

    return response.data as FetchResponse[];
  }
);
export const orderThunk = createAsyncThunk(
  ORDER_THUNKS,
  async ({ cart_id, method }: OrderPops) => {
    let url = generateURL("/api/user/order");
    let response;
    if (method === "POST") {
      response = await axios.post(url, { cart_id });
    } else if (method === "GET") {
      response = await axios.get(url);
    } else {
      response = await axios.delete(url, {
        data: {
          cart_id,
        },
      });
    }

    return response.data as Order[];
  }
);
export const addressThunks = createAsyncThunk(
  ADDRESS_THUNKS,
  async ({
    address,
    address_type,
    flat_number,
    landmark,
    method,
    address_id
  }: AddressProps) => {
    const url = generateURL("/api/user/address");
    let response;
    if (method === "POST") {
      response = await axios.post(url, {
        address,
        address_type,
        flat_number,
        landmark,
      });
      return response.data as Addresses
    }else if (method ==="GET") {
      response = await axios.get(url);
      return response.data as Addresses[]
    }
    else{
      await axios.delete(url,{
        data:{
          address_id
        }
      })
      return address_id as string
    }

  }
);
