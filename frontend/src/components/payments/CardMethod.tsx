import { useState } from "react";
import { cardList } from "../../data";
import styles from "./Styles/payment.module.css";
import { GetCardType } from "../../utils";
import { useAppSelector } from "../../redux";
import { useOrder } from "../../hooks";
function CardMethod({ total }: { total: number }) {
  const cart_id = useAppSelector((state) => state.cart.carts!._id);
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardImg, setCardImg] = useState("");
  const [name, setName] = useState("");
  const order = useOrder();
  function handelCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let digitsOnly = e.target.value.replace(/\D/g, "");
    let groups = digitsOnly.match(/(\d{1,4})/g);
    let formattedInput = groups ? groups.join(" ") : "";
    setCardNumber(formattedInput);
    setCardImg(cardList[GetCardType(formattedInput)] || "");
  }
  function handelExp(e: React.ChangeEvent<HTMLInputElement>) {
    let digitsOnly = e.target.value.replace(/\D/g, "");
    if (digitsOnly.length === 1 && Number(digitsOnly) > 3) {
      digitsOnly = "0" + digitsOnly;
    }
    if (digitsOnly.length === 2 && Number(digitsOnly) > 30) {
      return;
    }
    let groups = digitsOnly.match(/(\d{1,2})/g);
    let formattedExpiration = groups ? groups.join("/") : "";
    setExp(formattedExpiration);
  }
  return (
    <>
      <div
        className={`${styles.paymentMethods__img} ${styles.paymentMethods__img__sm}`}
      >
        <p>We accept</p>
        {Object.keys(cardList).map((key) => {
          return <img key={key} src={cardList[key]} alt={key} />;
        })}
      </div>
      <div className={styles.payment__method}>
        <div className={styles.input__container}>
          <input
            type="text"
            value={cardNumber}
            onChange={handelCardNumber}
            placeholder="Card number"
            maxLength={23}
          />
          {!!cardImg && (
            <img src={cardImg} className={styles.cardImg} alt="card type" />
          )}
        </div>
        <div
          className={styles.input__container}
          style={{ width: "60%", display: "inline-flex" }}
        >
          <input
            type="text"
            value={exp}
            onChange={handelExp}
            placeholder="Valid through(MM/YY)"
            maxLength={5}
          />
        </div>
        <div
          className={styles.input__container}
          style={{ width: "40%", display: "inline-flex" }}
        >
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            placeholder="CVV"
            maxLength={3}
          />
        </div>
        <div className={styles.input__container}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on card"
            maxLength={20}
          />
        </div>
        <button
          disabled={
            name.length < 3 ||
            cvv.length !== 3 ||
            exp.length !== 5 ||
            cardNumber.length < 19
          }
          onClick={_=>order(cart_id)}
          className={styles.payment__btn}
        >
          PAY ₹{total}
        </button>
        <p className={styles.cardSecurityText}>
          Card details will be saved securely, based of the industry standard
        </p>
      </div>
    </>
  );
}

export default CardMethod;
