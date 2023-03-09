import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import slderImg from "../../../assets/Image/slider-1.webp";
import "./HeroSection.css";
const HeroSection = () => {
  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-area">
      <Container>
        <div className="row align-self-end d-flex">
          <div className="col-xl-6 col-lg-6 d-flex align-items-center">
            <div className="slider-content-left">
              <span className="slider-subtitle">
                Best Ear <br /> Headphones
              </span>
              <h3 className="slider-title">
                Find Best Matley <br /> Sound.
              </h3>
              <div className="slider-btn">
                <Link to="/products">
                  Shop Now <AiOutlineArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="slider-rigth text-end">
              <img src={slderImg} alt="" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
