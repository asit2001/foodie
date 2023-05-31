import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  LocationIcon,
  RupeeNoteIcon,
  UPIIcon,
  WalletIcon,
} from "../components/icons";
import Nav from "../components/navbar";
import styles from "./styles/CheckOut.module.css";
import UpiMethod from "../components/payments/UpiMethod";
import CardMethod from "../components/payments/CardMethod";
import CashMethod from "../components/payments/CashMethod";
import { cartThunk, useAppDispatch, useAppSelector } from "../redux";
import EmptyCart from "../components/EmptyCart";
import { DeliveryAddress } from "../components/Address";
function CheckOut() {
  const [isChange, setIsChange] = useState(true);
  const [method, setMethod] = useState<"UPI" | "CARD" | "COD">("UPI");
  const [{ carts, total_price }, { address, selectedAddress_id }] =
    useAppSelector((state) => [state.cart, state.user]);
  const dispatch = useAppDispatch();
  const selectedAddress =
    selectedAddress_id === ""
      ? address[0]
      : address.filter(({ _id }) => _id === selectedAddress_id)[0];
  function handelCart(key: string, opType: "get" | "inc" | "dec") {
    dispatch(
      cartThunk({
        menu_id: key,
        restaurant_id: carts?.restaurant_id._id,
        opType: opType,
      })
    );
  }
  return (
    <>
      <Nav />
      <main className="body">
        {total_price !== 0 ? (
          <div className={styles.container}>
            <section className={styles.checkout}>
              <div className={styles.iconBox}>
                <LocationIcon className={styles.icons} />
              </div>
              {!isChange ? (
                <div className={styles.address}>
                  <div className={styles.address__heading}>
                    <h3 className={styles.heading__text}>Delivery address</h3>
                    <Link
                      to={""}
                      className={styles.address__changeBtn}
                      onClick={() => setIsChange(true)}
                    >
                      CHANGE
                    </Link>
                  </div>
                  <h3 className={styles.address__type}>{selectedAddress.address_type}</h3>
                  <p className={styles.address__name}>
                    {selectedAddress.address}
                  </p>
                </div>
              ) : (
                <DeliveryAddress show={setIsChange} />
              )}
              <div className={styles.payment}>
                <div className={styles.iconBox} style={{ top: "auto" }}>
                  <WalletIcon className={styles.icons} />
                </div>
                <h3 className={styles.heading__text}>Choose payment method</h3>
                {!isChange && <div className={styles.payment__container}>
                  <div className={styles.payment__options}>
                    <div
                      className={
                        method === "UPI" ? styles.option__active : styles.option
                      }
                      onClick={() => setMethod("UPI")}
                    >
                      <UPIIcon className={styles.option__icon} />
                      <p className={styles.option__text}>UPI</p>
                    </div>
                    <div
                      className={
                        method === "CARD"
                          ? styles.option__active
                          : styles.option
                      }
                      onClick={() => setMethod("CARD")}
                    >
                      <CreditCardIcon className={styles.option__icon} />
                      <p className={styles.option__text}>
                        Credit & Debit cards
                      </p>
                    </div>
                    <div
                      className={
                        method === "COD" ? styles.option__active : styles.option
                      }
                      onClick={() => setMethod("COD")}
                    >
                      <RupeeNoteIcon className={styles.option__icon} />
                      <p className={styles.option__text}>Pay on Delivery</p>
                    </div>
                  </div>
                  <div className={styles.payment__payContainer}>
                    {method === "UPI" && (
                      <UpiMethod
                        total={
                          total_price + 10 + Math.round((total_price * 5) / 100)
                        }
                      />
                    )}
                    {method === "CARD" && (
                      <CardMethod
                        total={
                          total_price + 10 + Math.round((total_price * 5) / 100)
                        }
                      />
                    )}
                    {method === "COD" && (
                      <CashMethod
                        total={
                          total_price + 10 + Math.round((total_price * 5) / 100)
                        }
                      />
                    )}
                  </div>
                </div>}
              </div>
            </section>
            <section className={styles.cart__details}>
              <div className={styles.restaurant}>
                <img
                  className={styles.restaurant__img}
                  src={carts?.restaurant_id.img}
                  alt="restaurant"
                />
                <div className={styles.restaurant__details}>
                  <p className={styles.restaurant__name}>
                    {carts?.restaurant_id.name}
                  </p>
                  <p className={styles.restaurant__cuisine}>
                    {carts?.restaurant_id.cuisine}
                  </p>
                </div>
              </div>
              <ul className={styles.cartList}>
                {carts &&
                  Object.keys(carts.menus).map((key) => (
                    <div className={styles.item} key={key}>
                      <p>{carts.menus[key].menu_id.product__name}</p>
                      <div className={styles.right}>
                        <div className={styles.cart__btns}>
                          <p
                            className={styles.cart__btn}
                            onClick={() => handelCart(key, "dec")}
                          >
                            -
                          </p>
                          <p className={styles.cart__value}>
                            {carts.menus[key].quantity}
                          </p>
                          <p
                            className={styles.cart__btn}
                            onClick={() => handelCart(key, "inc")}
                          >
                            +
                          </p>
                        </div>
                        <p className={styles.price}>
                          ₹
                          {Math.round(
                            carts.menus[key].menu_id.price *
                              carts.menus[key].quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </ul>
              <div className={styles.billContainer}>
                <div className={styles.bill__details}>
                  <h4 className={styles.bill__header}>Bill Details</h4>
                  <p className={styles.bill__textContainer}>
                    <span>Item Total</span> <span>₹{total_price}</span>
                  </p>
                  <p className={styles.bill__textContainer}>
                    <span>Delivery Fee</span> <span>₹10</span>
                  </p>
                  <p className={styles.bill__textContainer}>
                    <span>GST </span>{" "}
                    <span>₹{Math.round((total_price * 5) / 100)}</span>
                  </p>
                </div>
                <p className={styles.total}>
                  <span>TO PAY</span>
                  <span>
                    ₹{total_price + 10 + Math.round((total_price * 5) / 100)}
                  </span>
                </p>
              </div>
            </section>
          </div>
        ) : (
          <EmptyCart />
        )}
      </main>
    </>
  );
}

export default CheckOut;
