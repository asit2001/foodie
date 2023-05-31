import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BagIcon,
  CreditCardIcon,
  HeartFill,
  LocationIcon,
  LogOutIcon,
} from "../components/icons";
import Nav from "../components/navbar";
import { logOutThunk, useAppDispatch, useAppSelector } from "../redux";
import Styles from "./styles/Account.module.css";
import cOutStyle from "./styles/CheckOut.module.css";
import Favorites from "../components/Favorites";
import { AccountBtn } from "../type";
import Order from "../components/Order";
import { AccountAddress } from "../components/Address";


function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedBtn, setSelectedBtn] = useState<AccountBtn>("Orders");
  const user = useAppSelector(state=>state.user)
  useEffect(()=>{
    if (!user.name) {
      navigate("/");
    }
  },[user.name,dispatch,navigate])


  function logOut() {
    dispatch(logOutThunk()).then((e) => {
      if (e.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  }
  return (
    <>
      <Nav />
      <main className={Styles.body}>
        {
          user.name && <div className={Styles.container}>
          <div className={Styles.profile}>
            <h2 className={Styles.userName}>{user.name}</h2>
            <p className={Styles.userEmail}>{user.email}</p>
          </div>
          <div className={Styles.user__details}>
            <div className={Styles.options}>
              <div
                className={
                  selectedBtn === "Orders"
                    ? cOutStyle.option__active
                    : cOutStyle.option
                }
                onClick={()=>setSelectedBtn("Orders")}
              >
                <BagIcon className={cOutStyle.option__icon} />
                <p className={cOutStyle.option__text}>Orders</p>
              </div>
              <div
                className={
                  selectedBtn === "Favorites"
                    ? cOutStyle.option__active
                    : cOutStyle.option
                }
                onClick={()=>setSelectedBtn("Favorites")}
              >
                <HeartFill className={cOutStyle.option__icon} />
                <p className={cOutStyle.option__text}>Favorites</p>
              </div>
              <div
                className={
                  selectedBtn === "Payments"
                    ? cOutStyle.option__active
                    : cOutStyle.option
                }
                onClick={()=>setSelectedBtn("Payments")}
              >
                <CreditCardIcon className={cOutStyle.option__icon} />
                <p className={cOutStyle.option__text}>Payments</p>
              </div>
              <div
                className={
                  selectedBtn === "Addresses"
                    ? cOutStyle.option__active
                    : cOutStyle.option
                }
                onClick={()=>setSelectedBtn("Addresses")}
              >
                <LocationIcon className={cOutStyle.option__icon} />
                <p className={cOutStyle.option__text}>Addresses</p>
              </div>
              <div className={cOutStyle.option} onClick={logOut}>
                <LogOutIcon className={cOutStyle.option__icon} />
                <p className={cOutStyle.option__text}>Log out</p>
              </div>
            </div>
            <div className={Styles.option__details}>
             {selectedBtn === "Favorites" &&  <Favorites />}
             {selectedBtn === "Orders" &&  <Order />}
             {selectedBtn==="Addresses" && <AccountAddress/>}
            </div>
          </div>
        </div>
        }
      </main>
    </>
  );
}

export default Account;
