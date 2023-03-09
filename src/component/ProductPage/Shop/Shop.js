import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import ProductItem from "../../Home/Product/ProductItem";
import "./Shop.css";
import Loader from "../../Sharder/Loader/Loader";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterproducts, setfilterProducts] = useState([]);
  const [filterItem, setFilterItem] = useState("All");
  const [loading, setloading] = useState(true);
  const [query, setquery] = useState("");
  const [paginationCount, setpaginationCount] = useState(0);
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
  const handleChange = (e) => {
    fetch(`https://dummyjson.com/products/search?q=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=20&skip=${paginationCount}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setloading(false);
      });
  }, [paginationCount]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=20&skip=${paginationCount}`)
      .then((res) => res.json())
      .then((data) => {
        setfilterProducts(data.products);
        setloading(false);
      });
  }, [paginationCount]);

  useEffect(() => {
    if (filterItem !== "All") {
      fetch(`https://dummyjson.com/products/category/${filterItem}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setloading(false);
            setProducts(data.products);
          } else {
            setloading(true);
          }
        });
    } else {
      fetch(`https://dummyjson.com/products?limit=20&skip=${paginationCount}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setloading(false);
            setProducts(data.products);
          } else {
            setloading(true);
          }
        });
    }
  }, [filterItem, paginationCount]);

  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };
  console.log(filterItem);
  const categories = getUniqueData(filterproducts, "category");
  const updateFilter = (e) => {
    let value = e.target.value;
    setFilterItem(value);
  };
  return (
    <section className="shop-area">
      <Container>
        <div className="shop-top">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-5">
              <div className="shop-result">
                <p>
                  Showing {products.length} of {products.length} results
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-7">
              <div className="shop-shortcut d-flex flex-wrap justify-content-md-end align-items-center">
                <div className="shop-short-item">
                  <div className="shop-search">
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="shop-short-item">
                  <div className="shop-sort-selece">
                    <div className="nice-select" role="button">
                      <select
                        name="category"
                        id="category"
                        className="category--select"
                        onChange={updateFilter}
                      >
                        {categories.map((cat, idx) => {
                          return (
                            <option value={cat} key={idx} name="category">
                              {cat}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              {products.map((product, idx) => (
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
          </>
        )}
      </Container>
    </section>
  );
};

export default Shop;
