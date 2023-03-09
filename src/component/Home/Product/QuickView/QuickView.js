import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiShoppingCart, FiLink } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./QuickView.css";
import { AuthContext } from "../../../Context/UserContext";
const QuickView = ({ id, products, handleAddToCart, closeModal }) => {
  const { quantity, setQuantity } = useContext(AuthContext);
  const [product, setproduct] = useState({});
  const {
    title,
    discountPercentage,
    category,
    price,
    description,
    rating,
    stock,
    thumbnail,
  } = product;

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setproduct(data);
      });
  }, [id]);

  return (
    <div className="modal-content">
      <div className="product-model-wrapper">
        <div className="product-modal-close">
          <button className="product-modal-close-btn" onClick={closeModal}>
            <RxCross1 />
          </button>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="product-model-thu">
              <img src={thumbnail} alt={title} className="w-100" />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="product-details-wrapper">
              <h3 className="product-title">{title}</h3>
              <p>{description}</p>
              <span className="product__ammount">
                ${price}{" "}
                <strong className="discount">
                  {discountPercentage}% Discount
                </strong>
              </span>
              <div className="product-quantity">
                <span
                  className="cart-minus"
                  role="button"
                  onClick={() => setQuantity(Number(quantity) - 1)}
                >
                  <AiOutlineMinus />
                </span>
                <input
                  type="number"
                  value={quantity}
                  className="cart-input"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <span
                  className="cart-plus"
                  role="button"
                  onClick={() => setQuantity(Number(quantity) + 1)}
                >
                  <AiOutlinePlus />
                </span>
              </div>
              <div className="product-details-action d-flex flex-wrap align-items-center">
                <button
                  className="product-add-cart-btn"
                  onClick={() => handleAddToCart(products)}
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
                <Link to={`/productDetails/${id}`}>
                  <button className="product-action-btn">
                    <FiLink />
                    <span className="product-action-tip">Product Details</span>
                  </button>
                </Link>
              </div>
              <div className="product-details-weight product__details-more">
                <p>Rating:</p>
                <span>{rating}</span>
              </div>
              <div className="product-details-category product__details-more">
                <p>Category:</p>
                <span className="text-capitalize">{category}</span>
              </div>
              <div className="product-details-dimention product__details-more">
                <p>Stock:</p>
                <span>{stock} in Stock</span>
              </div>
              <div className="product-details-share product__details-share">
                <span>Share:</span>
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
    </div>
  );
};

export default QuickView;
