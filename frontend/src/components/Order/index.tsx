import { useAppSelector } from "../../redux";
import OrderItem from "../OrderItem";
import Styles from "./Styles/Order.module.css";

function Order() {
  const orders = useAppSelector((state) => state.user.orders);

  return orders.length !== 0 ? (
    <>
        <h2 className={Styles.title}>Orders</h2>
      {orders.map((obj) => {
        return <OrderItem key={obj._id} order={obj}/>;
      })}
    </>
  ) : (
    <div className={Styles.noOrder}>
      <img className={Styles.noOrder__img} src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw" alt="no order" />
      <h4 className={Styles.noOrder__title}>No Orders</h4>
      <p className={Styles.noOrder__sub}>You haven't placed any order yet.</p>
    </div>
  );
}

export default Order;
