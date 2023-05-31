import { Link } from "react-router-dom"
import styles from "./Styles/EmptyCart.module.css"
function EmptyCart() {
  return (
    <div className={styles.container}>
        <div className={styles.img}>
        </div>
        <h2 className={styles.heading}>Your cart is empty</h2>
        <p className={styles.sub}>You can go to home page to view more restaurants</p>
        <Link to={"/"} className={styles.btn}>See restaurants near you</Link>
    </div>
  )
}

export default EmptyCart