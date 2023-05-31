import { useAppSelector } from "../../redux";
import Address from "./Address";
import Styles from "./Styles/Address.module.css";
function AccountAddress() {
  const addresses = useAppSelector((state) => state.user.address);
  return (
    <div className={Styles.account__container}>
      <h2 className={Styles.account__title}>Manage Addresses</h2>
      <div className={Styles.address__container}>
        {addresses.map((address) => {
          return <Address key={address._id} address={address} editable/>;
        })}
      </div>
    </div>
  );
}

export default AccountAddress;
