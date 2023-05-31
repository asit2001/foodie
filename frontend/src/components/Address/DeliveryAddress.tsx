import {
  selectAddressId,
  setAddressModel,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import {LocationIcon } from "../icons";
import Address from "./Address";
import Styles from "./Styles/Address.module.css";
function DeliveryAddress({ show }: { show: Function }) {
  const [{ address }, cityName] = useAppSelector((state) => [
    state.user,
    state.city.value,
  ]);
  const dispatch = useAppDispatch();
  function handelClick(_id: string) {
    dispatch(selectAddressId(_id));
    show(false);
  }
  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Choose a delivery address</h2>
      <p className={Styles.sub}>Multiple addresses in this location</p>
      <div className={Styles.address__container}>
        {address.map((address) => {
          return (
            <Address key={address._id} address={address}  handelClick={handelClick}/>
          );
        })}
        <div className={Styles.address}>
          <LocationIcon />
          <div className={Styles.address__details}>
            <h3 className={Styles.address__type}>Add New Address</h3>
            <p className={Styles.address__name}>{cityName}</p>
            <button
              onClick={() => dispatch(setAddressModel(true))}
              className={Styles.address__btn__outline}
            >
              Add New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
