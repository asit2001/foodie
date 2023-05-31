import { Link ,useLocation} from "react-router-dom";
import { Cart, Logo, Search, User } from "../icons";
import styles from "./styles/NavbarSm.module.css";
import { useAppSelector } from "../../redux";
function NavbarSm() {
  const path = useLocation().pathname;
  const [totalCart,name] = useAppSelector(state=>[state.cart.total,state.user.name]);
  return (
    <ul className={styles.mobileNavigation}>
      <Link to={"/"} className={path==="/"? styles.navItem__active:styles.navItem}>
        <Logo className={styles.logo} fill={path==="/"?"":"#3d4152"}/>
        <p className={styles.navItemText}>foodie</p>
      </Link>
      <Link to={"/search"} className={path==="/search"? styles.navItem__active:styles.navItem}>
        <Search className={styles.icon} />
        <p className={styles.navItemText}>Search</p>
      </Link>
      <Link to={"/checkout"} className={path==="/checkout"? styles.navItem__active: styles.navItem}>
        <span className={styles.cartContainer}>
          <Cart className={styles.cartIcon} />
          <span className={styles.cartNumber}>{totalCart}</span>
        </span>
        <p className={styles.navItemText}>cart</p>
      </Link>
      <Link to={name?"/my-account":"/login"} className={path==="/my-account"? styles.navItem__active:styles.navItem}>
        <User className={styles.icon} />
        <p className={styles.navItemText}>{name?"account":"login"}</p>
      </Link>
    </ul>
  );
}

export default NavbarSm;
