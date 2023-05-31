import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CITY,
  cityInitialState,
  getRestaurantsThunks,
  RESTAURANT,
  restaurantInitialState,
  CART,
  getSearchedProductThunks,
  cartInitialState,
  searchInitialState,
  SEARCH,
  USER,
  logInThunk,
  userInitialState,
  cartThunk,
  favoriteThunks,
  logOutThunk,
  orderThunk,
  addressThunks
} from ".";

import { City, Sort } from "../type";


const restaurantSlice = createSlice({
  initialState: restaurantInitialState,
  name: RESTAURANT,
  reducers: {
    sortRestaurants: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRestaurantsThunks.fulfilled, (state, action) => {
      state.total = action.payload.total;
      if (action.payload.page) {
        state.value = [...state.value, ...action.payload.data];
      } else {
        state.value = action.payload.data;
      }
      state.loading = false;
    });
  },
});
const citySlice = createSlice({
  name: CITY,
  initialState: cityInitialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.value = action.payload;
      state.showCityModel = false;
    },
    setShowCityModel: (state, action: PayloadAction<boolean>) => {
      state.showCityModel = action.payload;
    },
  },
});

const cartSlice = createSlice({
  name: CART,
  initialState: cartInitialState,
  reducers: {
    clearCart: (state) => {
      state.total = 0;
      state.total_price = 0;
      state.warring = false;
      state.carts = null;
    },
    setCartWarring: (state, action: PayloadAction<boolean>) => {
      state.warring = action.payload;
    },
  },
  extraReducers(builder) {
      builder.addCase(cartThunk.fulfilled,(state,action)=>{
        const data = action.payload
        state.carts = data
        state.total = data? Object.keys(data.menus).map(key=>data!.menus[key].quantity).reduce((prev,current)=>prev+current,0) :0;
        state.total_price = data? Object.keys(data.menus).map(key=>Math.round(data!.menus[key].quantity* data!.menus[key].menu_id.price)).reduce((prev,current)=>prev+current,0) :0;
      });
      builder.addCase(cartThunk.rejected,(state,action,)=>{
        state.carts = null;
        state.total = 0;
        state.total_price = 0;
        
      })
  },
});

const searchSlice = createSlice({
  name: SEARCH,
  initialState: searchInitialState,
  reducers: {
    setSearchLoading:(state,action:PayloadAction<boolean>)=>{
      state.loading = action.payload;
    },
    clearSearch:(state)=>{
      state.value = [];
    }
  },
  extraReducers(builder) {
    builder.addCase(getSearchedProductThunks.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

const userSlice = createSlice({
  name:USER,
  initialState:userInitialState,
  reducers:{
    expireUser:(state)=>{
      state.name = "";
    },
    clearLogInError(state){
      state.loginError = ""
    },
    setAddressModel(state,action:PayloadAction<boolean>){
      state.showAddress = action.payload
    },
    selectAddressId(state,action:PayloadAction<string>){
      state.selectedAddress_id = action.payload
    },
    
  },
  extraReducers(builder) {
      builder.addCase(logInThunk.fulfilled,(state,action)=>{
        state.name = action.payload.data.name;
        state.email = action.payload.data.email
        
      });
      builder.addCase(logInThunk.rejected,(state,action)=>{
        state.loginError = action.error.message || "Something went wrong";
        state.name = "";
      })
      builder.addCase(favoriteThunks.fulfilled,(state,action)=>{
        state.favorite = action.payload
      });
      builder.addCase(logOutThunk.fulfilled,(state)=>{
        state.name = "";
        state.favorite = [];
        state.data = {};
        state.orders = []        
      })
      builder.addCase(orderThunk.fulfilled,(state,action)=>{
        state.orders = action.payload
      });
      builder.addCase(addressThunks.fulfilled,(state,action)=>{
        const data = action.payload
        if (typeof(data)==="string") {
          state.address = state.address.filter(({_id})=> _id!==data);
        }
        else if (Array.isArray(data)) {
          state.address = data;
        }else{
          state.address = [...state.address,data];
        }
      })
  },
})

export const restaurantReducer = restaurantSlice.reducer;
export const { sortRestaurants, setLoading } = restaurantSlice.actions;
export const cityReducer = citySlice.reducer;
export const { setCity, setShowCityModel } = citySlice.actions;
export const cartReducer = cartSlice.reducer;
export const {clearCart, setCartWarring } = cartSlice.actions;
export const searchReducer = searchSlice.reducer
export const {setSearchLoading,clearSearch} = searchSlice.actions
export const userReducer = userSlice.reducer;
export const {expireUser,clearLogInError,setAddressModel,selectAddressId} = userSlice.actions

