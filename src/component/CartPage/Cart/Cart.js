import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineReply } from "react-icons/hi";
import UserContext, { AuthContext } from "../../Context/UserContext";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import "./Cart.css";
import { toast } from "react-toastify";
const Cart = () => {
  const { getLocalacrtData } = useContext(AuthContext);
  const [cartData, setCartData] = useState(getLocalacrtData());
  const formatNumber = (num) => {
    const pricision = num.toFixed(2);
    return Number(pricision);
  };
  const handleRemove = (id) => {
    const newCart = cartData.filter((pd) => pd.id !== Number(id));
    setCartData(newCart);
    localStorage.setItem("productShop", JSON.stringify(newCart));
    toast("data remove");
  };

  let total = 0;
  for (let i = 0; i < cartData.length; i++) {
    const cart = cartData[i];
    total = formatNumber(total + cart.price * (cart.quantity || 1));
  }
  const tax = formatNumber(total * 0.035);

  let shipping = 0;
  if (total > 1000) {
    shipping = 0;
  } else if (total > 500) {
    shipping = 120;
  } else if (total > 100) {
    shipping = 200;
  }
  const grandTotal = formatNumber(total + tax + shipping);
  return (
    <section className="cart-area">
      <Container>
        <div className="row">
          <col-12>
            <>
              <div className="table-content table-responsive">
                <div className="continue-shopping">
                  <Link to="/">
                    Continue Shopping
                    <HiOutlineReply />
                  </Link>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-cart-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.map((cartItem, index) => {
                      return (
                        <tr>
                          <td className="product-thumbnail" key={index}>
                            <Link to={`/`}>
                              <img
                                src={cartItem.thumbnail}
                                alt=""
                                width="125"
                              />
                            </Link>
                          </td>
                          <td className="cart-product-name">
                            <Link to={`/productDetails/${cartItem.id}`}>
                              {cartItem.title}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="amount">${cartItem.price}</span>
                          </td>
                          <td className="product-quantity m-auto">
                            <input
                              type="number"
                              value={cartItem.quantity}
                              className="cart-input"
                            />
                          </td>
                          <td className="product-subtotal">
                            <span className="total">
                              $
                              {formatNumber(cartItem.quantity * cartItem.price)}
                            </span>
                          </td>
                          <td className="product-remove">
                            <button onClick={() => handleRemove(cartItem.id)}>
                              <FaTimes />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row justify-content-end">
                <div className="col-md-5 mr-auto">
                  <div className="cart-paege-total">
                    <h2>Cart Total</h2>
                    <ul className="mb-4">
                      <li>
                        Subtotal <span>${total}</span>
                      </li>
                      <li>
                        Tax (3.5%) <span>${tax}</span>
                      </li>
                      <li>
                        Shipping <span>${formatNumber(shipping)}</span>
                      </li>
                      <li>
                        Total <span>${grandTotal}</span>
                      </li>
                    </ul>
                    <Link
                      to="/checkout"
                      className={
                        cartData.length
                          ? "checkoutbtn "
                          : "checkoutbtn disabled"
                      }
                    >
                      Proceed to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          </col-12>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
