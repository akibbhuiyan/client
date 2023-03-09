import React, { useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import axios from "axios";
import { AuthContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CAED_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};
const PayButton = ({
  cartItems,
  shipmentInfo,
  grandTotal,
  activeforPayment,
}) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://thug-store-server.vercel.app/payment",
          {
            amount: grandTotal * 100,
            id,
          }
        );

        if (response.data.success) {
          if (shipmentInfo) {
            shipmentInfo.product = cartItems;
            shipmentInfo.orderDate = format(new Date(), "PP");
            shipmentInfo.userEmail = user.email;
            shipmentInfo.status = "Pending";
            shipmentInfo.payID = response?.data?.payId;
          } else {
            toast("Please Fill the Shipping info");
          }
          const responseDb = await axios.post(
            "https://thug-store-server.vercel.app/addtoDatabase",
            {
              shipmentInfo,
            }
          );
          if (responseDb.data) {
            toast("Payment Successfull");
            localStorage.removeItem("productShop");
            navigate(-2, { replace: true });
          }
        }
      } catch (error) {
        toast("error", error);
      }
    } else {
      toast("Somthing wrong please try again later");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CAED_OPTIONS} />
          </div>
        </fieldset>
        <button
          className={
            activeforPayment
              ? "checkoutbtn w-100 "
              : "checkoutbtn w-100 disabled"
          }
        >
          Pay now
        </button>
      </form>
    </>
  );
};

export default PayButton;
