import {configureStore} from "@reduxjs/toolkit"
import { restaurantReducer,cityReducer, cartReducer, searchReducer, userReducer } from "."

const store = configureStore({
    reducer:{
        restaurant:restaurantReducer,
        city:cityReducer,
        cart:cartReducer,
        search:searchReducer,
        user :userReducer
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch