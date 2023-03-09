import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import ProductItem from "../../Home/Product/ProductItem";
import "./Shop.css";
import Loader from "../../Sharder/Loader/Loader";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterproducts, setfilterProducts] = useState([]);
  const [filterItem, setFilterItem] = useState("All");
  const [loading, setloading] = useState(true);
  const [query, setquery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [filterItem]);
  useEffect(() => {
    fetch(`http://localhost:5000/filterproduct?category=${filterItem}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setloading(false);
          const filered = data.filter((user) =>
            user.name.toLowerCase().includes(query)
          );
          if (filered) {
            setfilterProducts(filered);
          } else {
            setloading(true);
          }
        } else {
          setloading(true);
        }
      });
  }, [filterItem, query]);
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  const categories = getUniqueData(products, "category");
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
                  Showing {filterproducts.length} of {products.length} results
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
                      onChange={(e) => setquery(e.target.value)}
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
          <div className="row">
            {filterproducts.map((product, idx) => (
              <ProductItem key={idx} product={product} products={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Shop;
