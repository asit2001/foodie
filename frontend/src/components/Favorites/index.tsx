import { useEffect } from "react";
import Styles from "./Styles/Favorites.module.css";
import { favoriteThunks, useAppDispatch, useAppSelector } from "../../redux";
import Product from "../Product/Product";
function Favorites() {
  const favorite = useAppSelector((state) => state.user.favorite);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favorite.length === 0) {
      dispatch(favoriteThunks({ method: "GET" }));
    }
  }, [favorite, dispatch]);
  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Favorite Restaurants</h2>

      <div className={Styles.order_holder}>
        {" "}
        {favorite.map((obj) => {
          return <Product data={obj} key={obj._id} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
