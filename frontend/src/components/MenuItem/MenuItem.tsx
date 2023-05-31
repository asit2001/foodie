import { LazyLoadImage as Img } from "react-lazy-load-image-component";

import { Menu } from "../../type";
import { NonVegIcon, Rupee, VegIcon } from "../icons";
import styles from "./Styles/Menuitem.module.css";
import { cartThunk, setCartWarring, useAppDispatch, useAppSelector } from "../../redux";
import { useNavigate } from "react-router-dom";
function MenuItem({ menu, productId }: { menu: Menu; productId: string }) {
  const carts = useAppSelector(state => state.cart.carts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function updateCart(type:"inc"|"dec") {
    if (carts?.restaurant_id._id !== undefined && carts.restaurant_id._id !== productId && Object.keys(carts.menus).length !==0) {
      dispatch(setCartWarring(true));
      return;
    }
    
    dispatch(cartThunk({
      menu_id :menu._id,
      opType:type,
      restaurant_id :productId
    })).then(({meta})=>{
      if (meta.requestStatus==="rejected") {
        navigate("/login");
      }
    })
  }

  return (
    <div className={styles.menuItem}>
      <div className={styles.menuItem__details}>
        {menu.veg_or_non_veg === "Veg" ? (
          <VegIcon className={styles.icon} />
        ) : (
          <NonVegIcon className={styles.icon} />
        )}

        <h3 className={styles.product__name}>{menu.product__name}</h3>
        <p className={styles.price__container}>
          <Rupee className={styles.rupee} />
          <span>{menu.price}</span>
        </p>
      </div>
      <div className={styles.menuItem__addToCart}>
        {menu.img && (
          <Img src={menu.img} className={styles.img} alt={menu.product__name} />
        )}
        <div className={menu.img ? styles.btn : styles.btn__noImg}>
          {carts && carts.menus[menu._id] ? (
            <>
              <p onClick={()=>updateCart("dec")} className={styles.cart__btn}>-</p>
              <p className={styles.cart__value}>{carts.menus[menu._id].quantity}</p>
              <p onClick={()=>updateCart("inc")} className={styles.cart__btn}>+</p>
            </>
          ) : (
            <p onClick={()=>updateCart("inc")} className={styles.add}>ADD</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
