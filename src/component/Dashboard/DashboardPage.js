import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../Context/UserContext";
import NavBar from "../Sharder/NavBar/NavBar";
import "./DashboardPage.css";
import { FaUserEdit } from "react-icons/fa";
import { FiClipboard, FiInfo, FiLogOut } from "react-icons/fi";
import Profile from "./Profile/Profile";
import Order from "./Order/Order";
import Information from "./Information/Information";
import Loader from "../Sharder/Loader/Loader";
const DashboardPage = () => {
  const { logOut, user } = useContext(AuthContext);
  const [filteredItem, setFiltedItem] = useState("profile");
  const [cartProduct, setCartProduct] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://thug-store-server.vercel.app/productbyUser?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setShowLoading(false);
        setCartProduct(data);
      });
  }, [user]);
  if (showLoading) {
    return <Loader />;
  }
  return (
    <>
      <NavBar />
      <section className="profile-area">
        <Container>
          <div className="row">
            <div className="col-xxl-4 col-lg-4">
              <div className="profile-tab">
                <nav>
                  <div className="nav nav-tab flex-column">
                    <button
                      className={
                        filteredItem === "profile"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => setFiltedItem("profile")}
                    >
                      <span>
                        <FaUserEdit />
                      </span>
                      Profile
                    </button>
                    <button
                      className={
                        filteredItem === "orders"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => setFiltedItem("orders")}
                    >
                      <span>
                        <FiClipboard />
                      </span>
                      My Orders
                    </button>
                    <button
                      className={
                        filteredItem === "information"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      onClick={() => setFiltedItem("information")}
                    >
                      <span>
                        <FiInfo />
                      </span>
                      Information
                    </button>
                    <button className="nav-link" onClick={logOut}>
                      <span>
                        <FiLogOut />
                      </span>
                      LogOut
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-xxl-8 col-lg-8">
              <div className="profile-tab-content">
                {filteredItem === "profile" && (
                  <Profile
                    fade={filteredItem === "profile" ? "fade show" : "fade"}
                    cartProduct={cartProduct}
                  />
                )}
                {filteredItem === "orders" && (
                  <Order
                    fade={filteredItem === "orders" ? "fade show" : "fade"}
                    cartProduct={cartProduct}
                  />
                )}
                {filteredItem === "information" && (
                  <Information
                    fade={filteredItem === "information" ? "fade show" : "fade"}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DashboardPage;
