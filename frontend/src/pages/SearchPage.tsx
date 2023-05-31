import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "../components/icons";
import Nav from "../components/navbar";
import styles from "./styles/SearchPage.module.css";
import Product from "../components/Product/Product";
import ProductSkelton from "../components/Skeleton/ProductSkeleton";
import {
  getSearchedProductThunks,
  clearSearch,
  useAppDispatch,
  useAppSelector,
  setSearchLoading,
} from "../redux";

function SearchPage() {
  const [{ value: searchedData, loading }, city] = useAppSelector((state) => [
    state.search,
    state.city.value,
  ]);
  const history = false;
  let query = useSearchParams()[0];

  const [searchText, setSearchText] = useState(query.get("q") || "");
  const dispatch = useAppDispatch();
/* eslint-disable */
  useEffect(() => {
    if (searchedData.length !== 0) {
      dispatch(clearSearch());
    }
    let timeoutId = setTimeout(() => {
      if (searchText.length > 3) {
        dispatch(setSearchLoading(true));
        dispatch(getSearchedProductThunks({ city, query: searchText }));
      } else {
        dispatch(clearSearch());
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText, city, query,dispatch]);
  return (
    <>
      <Nav />
      <main className="body">
        <div className={styles.search__container}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={searchText}
              className={styles.search__input}
              placeholder="Search your food"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Search className={styles.search__icon} />
          </div>
        </div>
        <div className={styles.container}>
          {searchText === "" && history && (
            <div className={styles.search__history}>
              <div className={styles.history__header}>
                <span className={styles.history__title}>Recent Searches</span>
                <span className={styles.history__moreBtn}>show more</span>
              </div>
              <ul className={styles.history__list}>
                <li className={styles.history__listItem}>
                  <Search className={styles.history__searchIcon} />
                  <p className={styles.history__listItem__text}>pizza</p>
                </li>
              </ul>
            </div>
          )}
          {
            <InfiniteScroll
              dataLength={searchedData.length}
              className={"productList " + styles.products}
              next={() => {}}
              hasMore={false}
              loader={<ProductSkelton small />}
            >
              {loading
                ? Array.from({ length: 10 }).map((el, i) => (
                    <ProductSkelton small key={i} />
                  ))
                : searchedData?.map((obj) => (
                    <Product small key={obj._id} data={obj} />
                  ))}
            </InfiniteScroll>
          }
        </div>
      </main>
    </>
  );
}

export default SearchPage;
