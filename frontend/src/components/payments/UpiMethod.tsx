import {useState} from "react"
import styles from "./Styles/payment.module.css";
import { useAppSelector } from "../../redux";
import { useOrder } from "../../hooks";
function UpiMethod({total}:{total:number}) {
  const [upi,setUpi] = useState("")
  const cart_id = useAppSelector((state) => state.cart.carts!._id);
  const order = useOrder();
  return (
    <>
      <div className={styles.paymentMethods__img}>
        <p>We accept</p>
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/GooglePay_lh8a267"
          alt="GooglePay"
        />
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PhonePe_x1g54c7"
          alt="PhonePe"
        />
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/BHIM_lkkvup7"
          alt="BHIM"
        />
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Pockets_vxwejm7"
          alt="Pockets"
        />
        <span>& more</span>
      </div>
      <div className={styles.payment__method}>
        <h4 className={styles.payment__method__title}>Pay via New VPA</h4>
        <p className={styles.payment__method__sub}>
          You must have a Virtual Payment Address
        </p>
        <div className={styles.input__container}>
          <input onChange={e=>setUpi(e.target.value)} type="text" placeholder="Enter VPA" />
        </div>
        <button onClick={()=>order(cart_id)} disabled={!/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(upi)} className={styles.payment__btn}>VERIFY AND PAY ₹{total}</button>
      </div>
    </>
  );
}

export default UpiMethod;
