import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";
import { FiEye, FiLink, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

import Modal from "react-modal";
import QuickView from "./QuickView/QuickView";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../database/databaseManager";
import ProductItem from "./ProductItem";
import Loader from "../../Sharder/Loader/Loader";

const Product = () => {
  const [products, setproduct] = useState([]);
  const [loadin, setLoading] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        setproduct(data);
        setLoading(false);
      });
  }, []);
  if (loadin) {
    return <Loader />;
  }
  return (
    <section className="product-section">
      <Container>
        <div className="row align-item-end">
          <div className="col-lg-6 col-md-6">
            <h3 className="section-title">Popular Products</h3>
          </div>
        </div>
        <div className="product-tab-wrapper">
          <div className="row">
            {products?.map((product, idx) => (
              <ProductItem key={idx} product={product} products={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
