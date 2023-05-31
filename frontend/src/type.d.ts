export interface FetchResponse {
  _id: string;
  name: string;
  rating: number;
  rating_count: RatingCount;
  cost: number;
  address: string;
  cuisine: string;
  lic_no: string;
  menu: Menu[];
  link: string;
  pin: string;
  city: City;
  img: string;
  favorite: boolean;
}

export type City =
  | "Bangalore"
  | "Chennai"
  | "Cuttack"
  | "Delhi"
  | "Hyderabad"
  | "Kolkata"
  | "Mumbai"
  | "Noida";

export interface Menu {
  _id: string;
  price: number;
  veg_or_non_veg: VegOrNonVeg;
  product__name: string;
  img: string;
}

export type VegOrNonVeg = "Non-veg" | "Veg";

export type RatingCount =
  | "NA"
  | "100+ ratings"
  | "1K+ ratings"
  | "20+ ratings"
  | "500+ ratings"
  | "50+ ratings"
  | "5K+ ratings"
  | "Too Few Ratings";

interface Carts {
  restaurant_id?: string;
  [key: string]: number;
}
export type Sort = "rating" | "l2h" | "h2l" | "rel";

interface cartResponse {
  _id: string;
  menus: {
    [key: string]: {
      quantity: number;
      menu_id: {
        _id: string;
        price: number;
        veg_or_non_veg: string;
        product__name: string;
        img: string;
        restaurant: string;
        __v: number;
      };
      _id: string;
    };
  };
  user_id: string;
  restaurant_id: {
    _id: string;
    img: string;
    cuisine: string;
    name: string;
  };
  __v: number;
}
export interface decodeJWT {
  exp: number;
  iat: number;
  key: string;
  name: string;
  user_id: string;
  email: string;
}

export interface Order {
  cart_id: CartID;
  user_id: string;
  status: string;
  date: Date;
  _id: string;
  __v: number;
}

export interface CartID {
  _id: string;
  menus: Menus;
  user_id: string;
  restaurant_id: FetchResponse;
  ordered: boolean;
  __v: number;
}

export interface Menus {
  [key: string]: {
    quantity: number;
    menu_id: Menu;
    _id: string;
  };
}

export type AccountBtn = "Orders" | "Favorites" | "Payments" | "Addresses";
export interface InitMap {
  mapRef: React.RefObject<HTMLDivElement>;
  option: google.maps.MapOptions;
  markerOpt: google.maps.MarkerOptions;
}
export interface GetAddress {
  mapRef: React.RefObject<HTMLDivElement>;
  city: string;
  callBack: Function | React.SetStateAction;
}
export interface Addresses {
  address: string;
  address_type: "Office"|"Home"|"Others";
  flat_number: string;
  landmark: string;
  _id:string
}
