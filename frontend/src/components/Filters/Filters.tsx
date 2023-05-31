import { FilterIcon } from "../icons";
import styles from "./Styles/Filters.module.css";
import { sortRestaurants, useAppDispatch, useAppSelector } from "../../redux";

function Filters() {
  const dispatch = useAppDispatch()
  const {total,sort} = useAppSelector(state=>state.restaurant)
  return (
    <div className={styles.filters}>
      <h4 className={styles.result}>{total} restaurants</h4>
      <div className={styles.right__filter}>
        <p
          onClick={() => dispatch(sortRestaurants("rel"))}
          className={
            sort === "rel" ? styles.filter__text__active : styles.filter__text
          }
        >
          Relevance
        </p>
        <p
          onClick={() => dispatch(sortRestaurants("rating"))}
          className={
            sort === "rating" ? styles.filter__text__active : styles.filter__text
          }
        >
          Rating
        </p>
        <p
          onClick={() => dispatch(sortRestaurants("l2h"))}
          className={
            sort === "l2h" ? styles.filter__text__active : styles.filter__text
          }
        >
          Cost: Low to High
        </p>
        <p
          onClick={() => dispatch(sortRestaurants("h2l"))}
          className={
            sort === "h2l" ? styles.filter__text__active : styles.filter__text
          }
        >
          Cost: High to Low
        </p>
        <p className={styles.filter__setting}>
          <span className={styles.filter__text}>Filters</span>
          <FilterIcon className={styles.filter__icon} />
        </p>
      </div>
    </div>
  );
}

export default Filters;
