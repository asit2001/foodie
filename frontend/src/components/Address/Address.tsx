import { Link } from "react-router-dom";
import { Addresses } from "../../type";
import { HomeIcon,LocationIcon, OfficeIcon  } from "../icons";
import Styles from "./Styles/Address.module.css";
import { addressThunks, useAppDispatch } from "../../redux";

function Address({address,handelClick,editable}:{address:Addresses,handelClick?:Function,editable?:boolean}) {
    const dispatch = useAppDispatch();
    return (
    <div key={address._id} className={editable?Styles.address_editable: Styles.address}>
      {address.address_type === "Home" ? (
        <HomeIcon />
      ) : address.address_type === "Others" ? (
        <OfficeIcon />
      ) : (
        <LocationIcon />
      )}
      <div className={Styles.address__details}>
        <h3 className={Styles.address__type}>{address.address_type}</h3>
        <p className={Styles.address__name}>{address.address}</p>
        {!editable && <button
          onClick={() => handelClick && handelClick(address._id)}
          className={Styles.address__btn}
        >
          Deliver Here
        </button>}
        {editable && <div className={Styles.account__btnContainer}>     
           <Link onClick={_=>dispatch(addressThunks({method:"DELETE",address_id:address._id}))} className={Styles.account__btn} to={""}>Delete</Link>     
        </div>}
      </div>
    </div>
  );
}

export default Address;
