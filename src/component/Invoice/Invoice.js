import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { FiPrinter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import NavBar from "../Sharder/NavBar/NavBar";
import ReactToPrint from "react-to-print";
import "./Invoice.css";
const Invoice = () => {
  const { id } = useParams();
  const [products, setProduct] = useState({});
  const [cartArray, setCartArray] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5000/findCartById?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        try {
          const cart = data?.product;
          setCartArray(cart);
        } catch (error) {
          console.log(error);
        }
      });
  }, [id]);

  let total = 0;
  for (let i = 0; i < cartArray.length; i++) {
    const carti = cartArray[i];
    total = total + carti.price * (carti.quantity || 1);
  }
  const grandtotal = total + 60;

  return (
    <>
      <NavBar />
      <section className="invoice_area">
        <Container>
          <div className="invoice_msg_wrapper">
            <div className="row"></div>
            <div className="col-xl-12">
              <div className="invoice_msg">
                <p className="text-black alert alert-success">
                  Thank you <strong></strong> Your order have been received !
                </p>
              </div>
            </div>
          </div>
          <div className="invoice_wrapper" ref={componentRef}>
            <div className="invoice_header-wrapper">
              <div className="row align-items-end">
                <div className="col-md-4 col-sm-6">
                  <div className="invoice-left">
                    <h1 className="navbar-brand">Thug Store</h1>
                    <p>
                      2035 Boiltali <br />
                      Chandanaish,Chittagong
                    </p>
                  </div>
                </div>
                <div className="col-md-8 col-sm-6">
                  <div className="invoice-right mt-sm-0 text-sm-end">
                    <h3 className="title">Invoice</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice_customer">
              <div className="row">
                <div className="col-md-6 col-sm-8">
                  <div className="invoice_customer_details">
                    <h4 className="text-uppercass">
                      {products.firstName} {products.lastName}
                    </h4>
                    <p className="text-uppercass">{products.country}</p>
                    <p className="text-uppercass">{products.city}</p>
                    <p>{products.phone}</p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-4">
                  <div className="invoice_details mt-md-0 mt-20 text-md-end">
                    <p className="mb-0">
                      <strong>Invoice ID:</strong> #{products.payId}
                    </p>
                    <p className="mb-0">
                      <strong>Date:</strong> {products.orderDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice_order-table">
              <table className="table">
                {" "}
                <thead className="table-light">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Item Price</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody className="table_group_devider">
                  {cartArray.map((product, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{product.name}</td>
                      <td>{product?.quantity}</td>
                      <td>${product.price}</td>
                      <td>${product.price * product?.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="invoice_total alert-success">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="invoice_total_item">
                    <h5>Payment Method</h5>
                    <p className="text-uppercase">card</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice_total_item">
                    <h5>Shipping Cost</h5>
                    <p>$60</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice_total_item">
                    <h5>Discount</h5>
                    <p>$0.00</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="invoice_total_item">
                    <h5>Total Ammount</h5>
                    <p className="grandtotal text-danger">${grandtotal}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice_print text-end  ">
              <div className="row">
                <div className="col-xl-12">
                  <ReactToPrint
                    trigger={() => (
                      <button className="invoice-print-btn">
                        <FiPrinter className="me-1" />
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Invoice;
