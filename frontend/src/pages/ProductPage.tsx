import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { FetchResponse } from "../type";
import styles from "./styles/ProductPage.module.css";
import { RupeeCircle, Star, TimeCircle } from "../components/icons";
import Navbar from "../components/navbar/Navbar";
import NavbarSm from "../components/navbar/NavbarSm";
import MenuItem from "../components/MenuItem/MenuItem";
import { ClearCartModel } from "../components/Models";
import { Offers } from "../data";
import ProductHeader from "../components/ProductHeader";
import { cartThunk, useAppDispatch } from "../redux";

function ProductPage() {
  const productId = useLocation().pathname.split("-").at(-1);
  const navigate = useNavigate();

  const [data, setData] = useState<FetchResponse>();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data?.menu);
  const dispatch = useAppDispatch()
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/restaurant/product/${productId}`,{
        withCredentials:true
      })
      .then((res: AxiosResponse<FetchResponse, any>) => setData(res.data))
      .catch(() => navigate("/404"));
      dispatch(cartThunk({opType:"get"}))
  }, [productId, navigate,dispatch]);

  useEffect(() => {
    setFilteredData(
      data?.menu?.filter(({ product__name }) => {
        return product__name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search]);

  return (
    <>
      <Navbar />
      <NavbarSm />
      {data && (
        <>
          <ProductHeader name={data?.name} search={search} setSearch={setSearch} liked={data.favorite} restaurant_id={productId||""}/>
        <main className={styles.product__container}>
          <div className={styles.shop__details}>
            <div className={styles.shop__info}>
              <h3 className={styles.shop__title}>{data.name}</h3>
              <p className={styles.shop__cuisine}>{data.cuisine}</p>
              <p className={styles.shop__address}>{data.city}</p>
            </div>
            <div className={styles.shop__ratings}>
              <p className={styles.rating}>
                <Star className={styles.rating__icon} />
                <span className={styles.rating__text}>{data.rating}</span>
              </p>
              <p className={styles.rating_count}>{data.rating_count}</p>
            </div>
          </div>
          <div className={styles.time__offer}>
            <div className={styles.time__price}>
              <p className={styles.time__cost}>
                <TimeCircle className={styles.icon} />
                <span className={styles.time__price__text}>32 MINS</span>
              </p>
              <p className={styles.time__cost}>
                <RupeeCircle className={styles.icon} />
                <span className={styles.time__price__text}>
                  ₹{data.cost} for two
                </span>
              </p>
            </div>
            <div className={styles.offers}>
              {Offers.map((offer) => {
                return (
                  <div className={styles.offer} key={offer._id}>
                    <p className={styles.offer__container}>
                      <img src={offer.icon} alt="offers" />
                      <span className={styles.offer__title}>{offer.title}</span>
                    </p>
                    <p className={styles.offer__subtitle}>{offer.subTitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.menu}>
            {filteredData?.map((item) => {
              return (
                <MenuItem
                  productId={productId||""}
                  menu={item}
                  key={item._id}
                />
              );
            })}
          </div>
          <ClearCartModel />
        </main>
        </>
      )}
    </>
  );
}

export default ProductPage;
