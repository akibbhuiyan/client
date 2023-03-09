import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import paymentImg from "../../../assets/Image/footer-payment.webp";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-area">
        <div className="footer-top">
          <Container>
            <div className="row">
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                <div className="footer-widget  widget-p">
                  <div className="footer-logo">
                    <Link to="/home"> Thug Store</Link>
                  </div>
                  <div className="footer-widget-content">
                    <div className="footer_info">
                      <p>
                        The home and elements needed to create beautiful
                        products.
                      </p>
                      <div className="footer-social">
                        <Link to="www.fb.com">
                          <FaFacebookF />
                        </Link>
                        <Link to="www.fb.com">
                          <FaTwitter />
                        </Link>
                        <Link to="www.fb.com">
                          <FaLinkedinIn />
                        </Link>
                        <Link to="www.fb.com">
                          <FaYoutube />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="footer-widget">
                  <h3 className="footer-title">Company</h3>
                  <div className="footer-widget-content">
                    <ul>
                      <li>
                        <a href="/">About us</a>
                      </li>
                      <li>
                        <a href="/">Careers</a>
                      </li>
                      <li>
                        <a href="/">Store Locations</a>
                      </li>
                      <li>
                        <a href="/">Our Blog</a>
                      </li>
                      <li>
                        <a href="/">Reviews</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6">
                <div className="footer-widget">
                  <h3 className="footer-title">Shop</h3>
                  <div className="footer-widget-content">
                    <ul>
                      <li>
                        <a href="/">Game & Video</a>
                      </li>
                      <li>
                        <a href="/">Phone &Tablets</a>
                      </li>
                      <li>
                        <a href="/">Computers & Laptop</a>
                      </li>
                      <li>
                        <a href="/">Sport Watches</a>
                      </li>
                      <li>
                        <a href="/">Discounts</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-1 col-xl-1 col-lg-3 col-md-3 col-sm-6">
                <div className="footer-widget">
                  <h3 className="footer-title">Support</h3>
                  <div className="footer-widget-content">
                    <ul>
                      <li>
                        <a href="/">FAQs</a>
                      </li>
                      <li>
                        <a href="/">Reviews</a>
                      </li>
                      <li>
                        <a href="/">Contact Us</a>
                      </li>
                      <li>
                        <a href="/">Shipping</a>
                      </li>
                      <li>
                        <a href="/">Returns</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                <div className="footer-widget  widget-r">
                  <h3 className="footer-title">Talk To Us</h3>
                  <div className="footer-widget-content">
                    <p className="footer-text">
                      Find a location nearest you. See{" "}
                      <Link to="/">Our Stores</Link>
                    </p>
                    <div className="footer-contact">
                      <div className="footer-call">
                        <a href="tel:01612127552">+8801612127552</a>
                      </div>
                      <div className="footer-mail">
                        <a href="mailto:akib.bhuiyan922@gmail.com">
                          akib.bhuiyan922@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="footer-bottom">
          <Container>
            <div className="footer-bottom_inner">
              <div className="row">
                <div className="col-sm-6">
                  <div className="footer-copyright">
                    <p>
                      Copyright © {new Date().getFullYear()} By Thug Store All
                      rights reserved.
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="footer__payment text-sm-end">
                    <img src={paymentImg} alt="Payment" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
