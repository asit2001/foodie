import { clearCart, setCartWarring, useAppDispatch, useAppSelector } from "../../redux";
import styles from "./Styles/ClearCart.module.css";

function ClearCartModel() {
  const warring = useAppSelector(state=>state.cart.warring)
  const dispatch = useAppDispatch();
  return (
    <div className={warring? styles.module__container__active:styles.module__container}>
      <div className={styles.model}>
        <h3 className={styles.model__title}>Items already in cart</h3>
        <p className={styles.model__description}>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className={styles.btn__group}>
        <button onClick={()=>{dispatch(setCartWarring(false))}} className={styles.model__btn}>no</button>
        <button onClick={()=>{dispatch(clearCart())}} className={styles.model__btn}>Yes, start afresh</button>
        </div>
      </div>
    </div>
  );
}

export default ClearCartModel;
