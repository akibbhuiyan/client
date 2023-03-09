import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { FiEye, FiLink, FiShoppingCart } from "react-icons/fi";

import Modal from "react-modal";
import QuickView from "./QuickView/QuickView";

import { AuthContext } from "../../Context/UserContext";

const ProductItem = ({ product, products }) => {
  const { handleAddToCart } = useContext(AuthContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedproduct, setclickedproduct] = useState("");

  function closeModal() {
    setIsOpen(false);
  }
  // const getLocalacrtData = () => {
  //   const locarData = localStorage.getItem("productShop");
  //   if (locarData) {
  //     return JSON.parse(locarData);
  //   } else {
  //     return [];
  //   }
  // };
  // const [cartProduct, setCartProduct] = useState(getLocalacrtData);

  // const handleAddToCart = (product) => {
  //   const productId = product.id;
  //   const sameProduct = cartProduct.find((pd) => pd.id === productId);
  //   let count = Number(quantity);
  //   let newCart;

  //   if (sameProduct) {
  //     count = sameProduct.quantity + 1;
  //     sameProduct.quantity = Number(count);
  //     const others = cartProduct.filter((pd) => pd.id !== productId);
  //     newCart = [...others, sameProduct];
  //   } else {
  //     product.quantity = quantity;
  //     newCart = [...cartProduct, product];
  //   }
  //   toast(`${product.name} added Succesfully`);
  //   setCartProduct(newCart);
  //   addToDatabaseCart(newCart);
  // };

  const handleProduct = (pdId) => {
    setclickedproduct(pdId);
    setIsOpen(true);
  };

  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="product-item ">
          <div className="product-thumbnail">
            <Link to={`/productDetails/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
            </Link>
            <div className="product-action d-flex flex-column flex-wrap">
              <button
                className="product-action-btn"
                onClick={() => handleProduct(product.id)}
              >
                <FiEye />
                <span className="product-action-tip">Quick view</span>
              </button>

              <Link
                to={`/productDetails/${product.id}`}
                className="product-action-btn"
              >
                <button className="product-action-btn">
                  <FiLink />
                  <span className="product-action-tip">Product Details</span>
                </button>
              </Link>
            </div>
            <div className="product-add">
              <button
                className="product-add-cart-btn w-100"
                onClick={() => handleAddToCart(product)}
              >
                <FiShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product-content">
            <h3 className="product-title">
              <Link to={`/productDetails/${product._id}`}>{product.title}</Link>
            </h3>
            <span className="product-price">${product.price}</span>
          </div>
        </div>
      </div>
      {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="product-item ">
          <div className="product-thumbnail">
            <Link to={`/productDetails/${product._id}`}>
              <img src={product.thumbnail} alt={product.name} />
            </Link>
            <div className="product-action d-flex flex-column flex-wrap">
              <button
                className="product-action-btn"
                onClick={() => handleProduct(product._id)}
              >
                <FiEye />
                <span className="product-action-tip">Quick view</span>
              </button>

              <Link
                to={`/productDetails/${product._id}`}
                className="product-action-btn"
              >
                <button className="product-action-btn">
                  <FiLink />
                  <span className="product-action-tip">Product Details</span>
                </button>
              </Link>
            </div>
            <div className="product-add">
              <button
                className="product-add-cart-btn w-100"
                onClick={() => handleAddToCart(product)}
              >
                <FiShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product-content">
            <h3 className="product-title">
              <Link to={`/productDetails/${product._id}`}>{product.name}</Link>
            </h3>
            <span className="product-price">${product.price}</span>
          </div>
        </div>
      </div> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="model-main"
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <QuickView
          products={products}
          id={clickedproduct}
          handleAddToCart={handleAddToCart}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default ProductItem;
