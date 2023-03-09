import React from "react";
import { Container } from "react-bootstrap";
import { RiHome7Line, RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./BreadcrumbArea.css";
const BreadcrumbArea = ({ backLink, mainPage, productName }) => {
  return (
    <section className="breadcrumb-area">
      <Container>
        <div className="row">
          <div className="col-lg-7">
            <div className="breadcrumb-content">
              <span className="breadcrumb-icon">
                <RiHome7Line />
              </span>
              <span>
                <Link to={`/${backLink}`} className="text-capitalize">
                  {backLink}
                </Link>
              </span>
              <span className="dvr">
                <RiArrowRightSLine />
              </span>
              <span>{mainPage}</span>
              {productName && (
                <>
                  <span className="dvr">
                    <RiArrowRightSLine />
                  </span>
                  <span>{productName}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BreadcrumbArea;
