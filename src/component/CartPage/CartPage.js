import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RiArrowRightSLine, RiHome7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import NavBar from "../Sharder/NavBar/NavBar";
import Cart from "./Cart/Cart";
import "./CartPage.css";
import Loader from "../Sharder/Loader/Loader";
const CartPage = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (showLoading) {
    return <Loader />;
  }
  return (
    <>
      <NavBar />
      <section className="breadcrumb-area p-relative">
        <Container>
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-10">
              <div className="breadCrumb-content text-center p-relative">
                <h3 className="breadcrumb-title">My Cart</h3>
                <div className="breadcrub-list">
                  <span>
                    <Link to="/home" className="text-capitalize">
                      Home
                    </Link>
                  </span>
                  <span className="dvr">
                    <RiArrowRightSLine />
                  </span>
                  <span>Cart</span>
                </div>
              </div>
            </div>
            -
          </div>
        </Container>
      </section>
      <Cart />
    </>
  );
};

export default CartPage;
