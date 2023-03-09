import React, { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import { FiShoppingCart, FiLink } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Details.css";
import ProductItem from "../../Home/Product/ProductItem";
import Loader from "../../Sharder/Loader/Loader";
const Details = (props) => {
  const { setQuantity, quantity, handleAddToCart } = useContext(AuthContext);
  const {
    name,
    thumbnail,
    price,
    description,
    category,
    weight,
    brand,
    dimensions,
  } = props.product;
  const [related, setRelated] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/filterproduct?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelated(data);
      });
  }, [category]);
  if (!name) {
    return <Loader />;
  }

  return (
    <section className="product-details-area">
      <Container>
        <div className="row">
          <div className="col-xl-7 col-lg-6 d-flex align-items-center">
            <div className="product-details-thumb">
              <img src={thumbnail} alt={name} />
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="product-details-wrapper">
              <div className="product-stock">
                <span>60 in Stock</span>
              </div>
              <h3 className="product-details-title">{name}</h3>
              <p>
                Thug store for every day low prices. Free shipping on orders
                $35+ or Pickup In-store and get
              </p>
              <div className="product-details-price">${price}</div>
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
                  onClick={() => handleAddToCart(props.product)}
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
              </div>
              <div className="product-details-weight product__details-more">
                <p>Weight:</p>
                <span>{weight}</span>
              </div>
              <div className="product-details-category product__details-more">
                <p>Category:</p>
                <span>{category}</span>
              </div>
              <div className="product-details-dimention product__details-more">
                <p>Brand:</p>
                <span>{brand}</span>
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
        <div className="row">
          <div className="col-12">
            <div className="product-details-tab d-flex flex-sm-nowrap flex-wrap">
              <div className="nav-link">Description</div>
            </div>
            <div className="product-details-tab-content">
              <div className="product-details-description">
                <h3 className="product-desc-title">{name}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <section className="pt-110">
            <div className="related-product">
              <h3 className="section-title">Related Products</h3>
              <div className="row">
                {related.map((relatedProduct, idx) => (
                  <ProductItem
                    key={idx}
                    product={relatedProduct}
                    products={relatedProduct}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
};

export default Details;
