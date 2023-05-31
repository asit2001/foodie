import { Link, useLocation } from "react-router-dom";
import { Cart, DownArrow, Help, Logo, Offer, Search, User } from "../icons";
import styles from "./styles/Navbar.module.css";
import { setShowCityModel, useAppDispatch, useAppSelector } from "../../redux";


function Navbar() {
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;
  const [totalCart, city,name] = useAppSelector((state) => [
    state.cart.total,
    state.city.value,
    state.user.name
  ]);


  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link to={"/"} className={styles.left__group}>
            <Logo />
            <div
              className={styles.location}
              onClick={() => {
                dispatch(setShowCityModel(true));
              }}
            >
              <span className={styles.location__address}>{city}</span>
              <DownArrow fill="#fc8019" />
            </div>
          </Link>
          <ul className={styles.right__group}>
            <Link
              to="/checkout"
              className={
                path === "/checkout" ? styles.listItem__active : styles.listItem
              }
            >
              <span className={styles.cartContainer}>
                <Cart className={styles.cartIcon} />
                <span className={styles.cartNumber}>{totalCart}</span>
              </span>
              <span className={styles.listItemText}>Cart</span>
            </Link>
            {!!name ? (
              <Link
                to={"/my-account"}
                className={
                  path === "/my-account"
                    ? styles.listItem__active
                    : styles.listItem
                }
              >
                <User className={styles.icon} />
                <span className={styles.listItemText}>{name}</span>
              </Link>
            ) : (
              <Link
                to={"/login"}
                className={styles.listItem}
              >
                <User className={styles.icon} />
                <span className={styles.listItemText}>Log In</span>
              </Link>
            )}
            <Link
              to={"/support"}
              className={
                path === "/support" ? styles.listItem__active : styles.listItem
              }
            >
              <Help className={styles.icon} />
              <span className={styles.listItemText}>Help</span>
            </Link>
            <Link
              to={"/offers"}
              className={
                path === "/offers" ? styles.listItem__active : styles.listItem
              }
            >
              <Offer className={styles.icon} />
              <span className={styles.listItemText}>Offers</span>
            </Link>
            <Link
              to={"/search"}
              className={
                path === "/search" ? styles.listItem__active : styles.listItem
              }
            >
              <Search className={styles.icon} />
              <span className={styles.listItemText}>Search</span>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
