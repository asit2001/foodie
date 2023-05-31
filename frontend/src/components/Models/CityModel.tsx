import { useState } from "react";
import { cityList } from "../../data";
import styles from "./Styles/CityModel.module.css";
import {
  setCity,
  setShowCityModel,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import { CloseIcon } from "../icons";
function CityModel() {
  const [search, setSearch] = useState("");
  const { showCityModel } = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        showCityModel
          ? styles.model__container__active
          : styles.model__container__inactive
      }
    >
      <div className={styles.model}>
        <p className={styles.close__btn}>
          <CloseIcon
            onClick={() => {
              dispatch(setShowCityModel(false));
            }}
            style={{ cursor: "pointer" }}
          />
        </p>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search for City"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className={styles.results__container}>
          {cityList
            .filter(({ name, state }) =>
              (name + state).toLowerCase().includes(search.toLowerCase())
            )
            .map(({ name, state }) => (
              <li
                key={name}
                className={styles.result__item}
                onClick={() => {
                  dispatch(setCity(name));
                }}
              >
                <h4 className={styles.city__name}>{name}</h4>
                <p className={styles.state__name}>{state}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CityModel;
