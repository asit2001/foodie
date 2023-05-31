import { useState } from "react";
import { HeartFill, HeartOutline, RightArrow, Search } from "../icons";
import styles from "./Styles/productHeader.module.css";
import { favoriteThunks, useAppDispatch, useAppSelector } from "../../redux";

interface Props {
  name: string | undefined;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  liked: boolean;
  restaurant_id: string;
}

function ProductHeader({
  name,
  search,
  setSearch,
  liked,
  restaurant_id,
}: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const [isLiked, setIsLiked] = useState(liked);
  function clearSearch() {
    setSearch("");
    setShowSearch(false);
  }
  function handelLiked(method: "GET"|"POST"|"DELETE") {
    dispatch(favoriteThunks({ restaurant_id, method })).then(({ meta }) => {
      if (meta.requestStatus==="fulfilled") {
        setIsLiked(method==="POST");
      }
    });
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.topHeader}>
        {showSearch ? (
          <div className={styles.searchContainer}>
            <RightArrow className={styles.arrowIcon} onClick={clearSearch} />
            <input
              type="text"
              className={styles.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className={styles.searchIcon} />
          </div>
        ) : (
          <>
            <p className={styles.title}>{name}</p>

            <div className={styles.icons}>
              {userName && isLiked && (
                <HeartFill
                  className={styles.icon__fill}
                  onClick={() => handelLiked("DELETE")}
                />
              )}
              {userName && !isLiked && <HeartOutline onClick={() => handelLiked("POST")} />}
              <Search onClick={setShowSearch.bind(null, true)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductHeader;
