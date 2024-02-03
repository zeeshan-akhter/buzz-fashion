import { useState } from "react";
import "./ImageCarousel.css";
import kidsBanner from "../../images/Homepage/kids-banner.png";
import menBanner from "../../images/Homepage/men-banner.png";
import womenBanner from "../../images/Homepage/women-banner.png";
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  const imgArr = [
    { imgUrl: menBanner, category: "Men" },
    { imgUrl: womenBanner, category: "Women" },
    { imgUrl: kidsBanner, category: "Kids" },
  ];
  const sliderStyle = (indexValue) => ({
    width: "100vw",
    height: "100vh",
    transition: "all 0.8s ease",
    transform: `translateX(-${indexValue * 100}vw)`,
  });

  const handleSlider = (direction) => {
    if (direction === "left") {
      setIndex((index) => (index > 0 ? index - 1 : 2));
    } else {
      setIndex((index) => (index < 2 ? index + 1 : 0));
    }
  };

  return (
    <>
      <div className="slider-container">
        {/* <i
          className="fas fa-arrow-left arrow-left"
          onClick={() => handleSlider("left")}
        ></i> */}
        <FontAwesomeIcon
          className="arrow-left"
          icon={faArrowLeft}
          onClick={() => handleSlider("left")}
        />
        <div className="wrapper">
          {imgArr.map(({ imgUrl, category }) => {
            return (
              <div style={sliderStyle(index)} key={imgUrl}>
                <div className="image-container">
                  <img alt="cover img" src={imgUrl} className="cover-image" />
                </div>

                <NavLink className="slider-image-link" to="/products">
                  Shop Now
                </NavLink>
              </div>
            );
          })}
        </div>
        <FontAwesomeIcon
          className="arrow-right"
          icon={faArrowRight}
          onClick={() => handleSlider("right")}
        />
        {/* <i
          className="fas fa-arrow-right arrow-right"
          onClick={() => handleSlider("right")}
        ></i> */}
      </div>
    </>
  );
};
