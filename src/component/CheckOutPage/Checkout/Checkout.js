import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FiDatabase } from "react-icons/fi";
import { AuthContext } from "../../Context/UserContext";
import "./Checkout.css";
import PayButton from "./PayButton/PayButton";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LecPPBh3P6pxtij3Ow2h6IIm82T1tdeBYJ54aipvONaWRVBBcqXdAhdfYBcTTTtqCw9Zul0GT1lggVog2Wj0coP00ME8LpjJm"
);
const Checkout = () => {
  const { getLocalacrtData } = useContext(AuthContext);
  const [shipmentInfo, setshipmentInfo] = useState({});
  const [activeforPayment, setactiveforPayment] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const cartData = getLocalacrtData();
  const formatNumber = (num) => {
    const pricision = num.toFixed(2);
    return Number(pricision);
  };
  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
    const cart = cartData[i];
    total = formatNumber(total + cart.price * (cart.quantity || 1));
  }
  const tax = formatNumber(total * 0.035);
  let discount = formatNumber(0.0);
  let shipping = 0;
  if (total > 1000) {
    shipping = 80;
  } else if (total > 500) {
    shipping = 120;
  } else if (total > 100) {
    shipping = 200;
  }
  const grandTotal = formatNumber(total + tax + shipping + discount);

  const onSubmit = (data) => {
    setactiveforPayment(true);
    setshipmentInfo(data);
  };

  return (
    <section className="checkout-area">
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="checkbox-form">
                <h3>Billing Details</h3>
                <div className="row">
                  <div className="col-md-12">
                    <div className="checkout-formList">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        {...register("firstName", { required: true })}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-formList">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        {...register("lastName", { required: true })}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-formList">
                      <label htmlFor="address">
                        Address <span className="required">*</span>
                      </label>
                      <input
                        {...register("address", { required: true })}
                        placeholder="Address"
                      />
                      {errors.address && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-formList">
                      <label htmlFor="city">
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        {...register("city", { required: true })}
                        placeholder="Town / City"
                      />
                      {errors.city && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-formList">
                      <label htmlFor="country">
                        State / County <span className="required">*</span>
                      </label>
                      <input
                        {...register("country", { required: true })}
                        placeholder="State / County "
                      />
                      {errors.country && (
                        <span className="text-danger ">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-formList">
                      <label htmlFor="zipcode">
                        Postcode / Zip <span className="required">*</span>
                      </label>
                      <input
                        {...register("zipcode", { required: true })}
                        placeholder="Postcode / Zip "
                      />
                      {errors.zipcode && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-formList">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Email Address "
                      />
                      {errors.email && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-formList">
                      <label htmlFor="phone">
                        Phone<span className="required">*</span>
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        placeholder="Phone"
                        type="number"
                      />
                      {errors.phone && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-formList">
                      <label htmlFor="checkoutmsg">Order Notes</label>
                      <textarea
                        cols="30"
                        rows="10"
                        {...register("checkoutmsg")}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </div>
                  </div>
                  <button className="checkoutbtn" type="submit">
                    Procced
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="your-order">
              <h3>Your Order</h3>
              <div className="your-order-table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="product-name">Product</th>
                      <th className="product-total text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((cart, idx) => (
                      <tr className="cart-item" key={idx}>
                        <td className="product-name">
                          {cart.name}
                          <strong className="product-quantity">
                            × {cart.quantity}
                          </strong>
                        </td>
                        <td className="product-total text-end">
                          ${cart.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="cart-subtotal">
                      <th>Cart Subtotal</th>
                      <td className="text-end">
                        <strong>
                          <span className="amount text-end">${total}</span>
                        </strong>
                      </td>
                    </tr>
                    <tr className="shipping">
                      <th>Shipping</th>
                      <td className="text-end">
                        <strong>${shipping}</strong>
                      </td>
                    </tr>
                    <tr className="shipping">
                      <th>Tax (.35%)</th>
                      <td className="text-end">
                        <strong>${tax}</strong>
                      </td>
                    </tr>
                    <tr className="shipping">
                      <th>Discount</th>
                      <td className="text-end">
                        <strong>${discount}</strong>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Total Order</th>
                      <td className="text-end">
                        <strong>
                          <span className="amount">${grandTotal}</span>
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="payment-btn">
                  <Elements stripe={stripePromise}>
                    <PayButton
                      cartItems={cartData}
                      shipmentInfo={shipmentInfo}
                      grandTotal={Math.round(grandTotal)}
                      activeforPayment={activeforPayment}
                    />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
