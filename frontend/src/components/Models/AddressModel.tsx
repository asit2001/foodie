import { useRef, useEffect, useState } from "react";
import {
  addressThunks,
  setAddressModel,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { CloseIcon } from "../icons";
import styles from "./Styles/CityModel.module.css";
import { getAddress } from "../../utils";
function AddressModel() {
  const [showAddress, city] = useAppSelector((state) => [
    state.user.showAddress,
    state.city.value
  ]);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState("");
  const [flatNum, setFlatNum] = useState("");
  const [landmark, setLandMark] = useState("");
  const [addressType, setAddressType] = useState<"Others" | "Home" | "Office">(
    "Others"
  );
  useEffect(() => {
    getAddress({ mapRef: ref, city: city, callBack: setAddress });
  }, [city, ref]);

  function saveAddress() {
    dispatch(
      addressThunks({
        address,
        address_type: addressType,
        landmark,
        flat_number: flatNum,
        method: "POST",
      })
    ).then(({meta})=>{
      if (meta.requestStatus==="fulfilled") {
        dispatch(setAddressModel(false));
      }
    });
  }
  return (
    <div
      className={
        showAddress
          ? styles.model__container__active
          : styles.model__container__inactive
      }
    >
      <div className={styles.model}>
        <p className={styles.close__btn}>
          <CloseIcon
            onClick={() => {
              dispatch(setAddressModel(false));
            }}
            style={{ cursor: "pointer" }}
          />
        </p>
        <div className={styles.map} ref={ref}></div>
        <input
          type="text"
          className={styles.search__input}
          placeholder="address"
          readOnly
          value={address}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          className={styles.search__input}
          placeholder="Door / Flat no."
          value={flatNum}
          onChange={(e) => setFlatNum(e.target.value)}
          style={{ marginTop: "10px" }}
        />
        <input
          type="text"
          className={styles.search__input}
          placeholder="Landmark"
          value={landmark}
          onChange={(e) => setLandMark(e.target.value)}
        />
        <div className={styles.btn_groups}>
          <button
            className={
              addressType === "Home"
                ? styles.address__btn__active
                : styles.address__btn
            }
            onClick={() => setAddressType("Home")}
          >
            Home
          </button>
          <button
            className={
              addressType === "Office"
                ? styles.address__btn__active
                : styles.address__btn
            }
            onClick={() => setAddressType("Office")}
          >
            Office
          </button>
          <button
            className={
              addressType === "Others"
                ? styles.address__btn__active
                : styles.address__btn
            }
            onClick={() => setAddressType("Others")}
          >
            Others
          </button>
        </div>
        <button
          onClick={saveAddress}
          disabled={!flatNum || !landmark}
          className={styles.btn}
        >
          SAVE ADDRESS
        </button>
      </div>
    </div>
  );
}

export default AddressModel;
