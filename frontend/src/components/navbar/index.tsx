import { useEffect } from "react";
import {
  addressThunks,
  cartThunk,
  orderThunk,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import Navbar from "./Navbar";
import NavbarSm from "./NavbarSm";
import { AddressModel, CityModel } from "../Models";

function Nav() {
  const name = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!!name) {
      dispatch(cartThunk({ opType: "get" }));
      dispatch(orderThunk({ method: "GET" }));
      dispatch(addressThunks({method:"GET"}))
    }
  }, [name, dispatch]);
  return (
    <>
      <CityModel />
      <AddressModel />
      <Navbar />
      <NavbarSm />
    </>
  );
}

export default Nav;
