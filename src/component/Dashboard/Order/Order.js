import React from "react";
import { Link } from "react-router-dom";
import "./Order.css";
const Order = ({ fade, cartProduct }) => {
  return (
    <div className={`profile-ticket-table table-responsive ${fade}`}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Order Time</th>
            <th scope="col">Status</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {cartProduct.map((product, idx) => (
            <tr key={idx}>
              <th className="text-uppercase" scope="row">
                {product.payId}
              </th>
              <td className="order-data">{product.orderDate}</td>
              <td className="order-status">Pending</td>
              <td>
                <Link to={`/order/${product._id}`}>Invoice</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
