import { useOrder } from "../../hooks";
import { useAppSelector } from "../../redux";
import styles from "./Styles/payment.module.css";
function CashMethod({total}:{total:number}) {
  const cart_id = useAppSelector((state) => state.cart.carts!._id);
  const order = useOrder();
  return (
    <div className={styles.payment__method}>
        <img className={styles.cod} src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_80/PaymentLogos/instruments/4x/Cod" alt="" />
        <h4 className={styles.payment__method__title}>Cash/Pay on Delivery</h4>
        <p className={styles.payment__method__sub}>
        Pay cash at time of delivery. You can also pay online anytime after placing order.
        </p>
        <button onClick={()=>order(cart_id)} className={styles.payment__btn}>PAY ₹{total}</button>
      </div>
  )
}

export default CashMethod