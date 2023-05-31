import { Order } from "../../type";
import Styles from "./Styles/OrderItem.module.css";
const OrderItem = ({ order }: { order: Order }) => {
  const restaurant = order.cart_id.restaurant_id;
  let total = 0;
  let ordered_menu = Object.keys(order.cart_id.menus)
    .map((key) => {
      const menus = order.cart_id.menus[key];
      total += menus.quantity * menus.menu_id.price;
      return `${menus.menu_id.product__name} x ${menus.quantity}`;
    })
    .join(",");
  return (
    <div className={Styles.container}>
      <div className={Styles.order__details}>
        <img
          src={restaurant.img}
          alt="restaurant"
          className={Styles.restaurant__img}
        />
        <div className={Styles.restaurant__details}>
          <h4 className={Styles.restaurant__name}>{restaurant.name}</h4>
          <p className={Styles.order_id}>ORDER #{order._id}</p>
        </div>
      </div>
      <p className={Styles.order__status}>Order Status: {order.status}</p>
      <div className={Styles.order__menus}>{ordered_menu}</div>
      <p className={Styles.order__price}>
        Total paid: ₹{total + 10 + Math.round((total * 5) / 100)}
      </p>
    </div>
  );
};

export default OrderItem;
