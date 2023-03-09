import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Product.css";
import { FiEye, FiLink, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
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
  const [paginationCount, setpaginationCount] = useState(0);
  const [loadin, setLoading] = useState(true);

  const handlePrevPage = () => {
    if ((paginationCount) => 20) {
      setpaginationCount(paginationCount - 10);
    } else {
      setpaginationCount(paginationCount);
    }
  };
  const handleNextPage = () => {
    if ((paginationCount) => 0 && paginationCount <= 90) {
      setpaginationCount(paginationCount + 10);
    } else {
      setpaginationCount(paginationCount);
    }
  };
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=12&skip=${paginationCount}`)
      .then((res) => res.json())
      .then((data) => {
        setproduct(data.products);
        setLoading(false);
      });
  }, [paginationCount]);

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
          <div className="row">
            <div className="col-12">
              <div className="pagination">
                <button className="pagi-btn" onClick={handlePrevPage}>
                  <HiArrowLeft /> Prev
                </button>
                <button className="pagi-btn" onClick={handleNextPage}>
                  Next <HiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
