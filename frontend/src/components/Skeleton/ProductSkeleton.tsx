import styles from "./Styles/ProductSkelton.module.css";

function ProductSkelton({small}:{small?:boolean}) {
  return (
    <div className={small?styles.product__sm :styles.product}>
      <div className={styles.product__img}></div>
      <div>
        <p className={styles.product__name}></p>
        <p className={styles.product__cuisine}></p>
        <div className={styles.product__price__review}>
          <p className={styles.product__rating}></p>
          <p className={styles.price}></p>
        </div>
        <p className={styles.offers}></p>
        <button className={styles.view__button}>quick view</button>
      </div>
    </div>
  );
}

export default ProductSkelton;
