import React from "react";
import BreadcrumbArea from "../Sharder/BreadcrumbArea/BreadcrumbArea";
import NavBar from "../Sharder/NavBar/NavBar";
import Shop from "./Shop/Shop";
const ProductPage = () => {
  return (
    <>
      <NavBar />
      <BreadcrumbArea backLink={"home"} mainPage={"Product"} />
      <Shop />
    </>
  );
};

export default ProductPage;
