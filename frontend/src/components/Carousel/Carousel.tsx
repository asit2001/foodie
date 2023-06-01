import { useState } from "react";
import data from "../../data";
import { RightArrow } from "../icons";

import styles from "./Styles/Carousel.module.css";
import { useWindowDimensions } from "../../hooks";
import { Link } from "react-router-dom";
import {LazyLoadImage as Img} from "react-lazy-load-image-component"

function Carousel() {
  const [carouselRight, setCarouselRight] = useState(false);
  const {width} = useWindowDimensions()
  return (
    <div className={styles.sliderContainer}>
      {carouselRight && (
        <div className={styles.leftArrowContainer}>
          <p
            className={styles.arrowBg}
            onClick={() => {
              setCarouselRight(false);
            }}
          >
            <RightArrow className={styles.leftArrow} />
          </p>
        </div>
      )}
      <ul
        className={styles.sliderList}
        style={carouselRight&&width>850?{transform:`translateX(${-(data.length*100 + 130) + Math.min(width,1200)}px)`}:{}}
      >
        {data.map(({ img, name },id) => {
          return (
            <Link className={styles.listItem} to={`/search?q=${name.toLowerCase()}`} key={id}>
              <Img height={"53px"} width={"100px"} src={img} alt={name} effect="blur"/>
              <p>{name}</p>
            </Link>
          );
        })}
      </ul>
      {!carouselRight && (
        <div className={styles.rightArrowContainer}>
          <p
            className={styles.arrowBg}
            onClick={() => {
              setCarouselRight(true);
            }}
          >
            <RightArrow className={styles.rightArrow} />
          </p>
        </div>
      )}
    </div>
  );
}

export default Carousel;
