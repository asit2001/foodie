import { Link } from "react-router-dom";
import {LazyLoadImage as Img} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Star,Offer, Rupee } from "../icons";
import styles from "./Styles/Product.module.css";
import { FetchResponse } from "../../type";

function Product({data,small}:{data:FetchResponse,small?:boolean}) {
  return (
    <Link to={`/restaurants/${data.name.replaceAll(" ","-").toLowerCase()}-${data._id}`} className={small ? styles.product_sm:styles.product}>
      <Img
        width={"240px"}
        height={"160px"}
        effect="blur"
        className={styles.product__img}
        src={data.img || "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/gol550ebdlzs9zvyimzu"}
        alt={data.cuisine}
      />
      <div>
        <h4 className={styles.product__name}>{data.name}</h4>
        <p className={styles.product__cuisine}>
          {data.cuisine}
        </p>
        <div className={styles.product__price__review}>
          <p className={styles.product__rating}>
            <Star className={styles.rating__icon} />
            <span className={styles.rating__value}>{data.rating}</span>
          </p>
          <p className={styles.price}>
            <Rupee className={styles.rupee} />
            <span className={styles.price__value}>{data.cost}</span>
          </p>
        </div>
        <p className={styles.offers}>
          <Offer /> <span className={styles.offers__text}>FREE DELIVERY</span>
        </p>
        <button className={styles.view__button}>quick view</button>
      </div>
    </Link>
  );
}

export default Product;
