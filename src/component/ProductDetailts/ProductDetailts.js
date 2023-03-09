import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbArea from "../Sharder/BreadcrumbArea/BreadcrumbArea";
import NavBar from "../Sharder/NavBar/NavBar";
import Details from "./Details/Details";

const ProductDetailts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  return (
    <>
      <NavBar />
      <BreadcrumbArea
        backLink={"home"}
        mainPage={"Products"}
        productName={product?.title}
      />
      {product && <Details product={product} />}
    </>
  );
};

export default ProductDetailts;
