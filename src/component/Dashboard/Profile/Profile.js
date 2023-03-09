import React, { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import total from "../../../assets/Image/total.svg";
import pending from "../../../assets/Image/deleteIcon.svg";
import proccesing from "../../../assets/Image/van.svg";
import complete from "../../../assets/Image/cart.svg";
import "./Profile.css";
const Profile = ({ fade, cartProduct }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={`profile_main ${fade}`}>
      <div className="profile_main-top">
        <div className="row align-items-center">
          <div className="d-flex flex-wrap align-items-center">
            <h4 className="profile_main-title">
              Welcome {user?.name || "Guest"}
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_main_info">
        <div className="row gx-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile-main-info-item">
              <div className="profile_main_info_icon">
                <span>{cartProduct.length}</span>
                <img src={total} alt="totla" />
              </div>
              <h4 className="profile_main_info_title">Total Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile-main-info-item">
              <div className="profile_main_info_icon">
                <span>{cartProduct.length}</span>
                <img src={pending} alt="totla" />
              </div>
              <h4 className="profile_main_info_title">Pending Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile-main-info-item">
              <div className="profile_main_info_icon">
                <span>0</span>
                <img src={proccesing} alt="totla" />
              </div>
              <h4 className="profile_main_info_title">Processing Order</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile-main-info-item">
              <div className="profile_main_info_icon">
                <span>0</span>
                <img src={complete} alt="totla" />
              </div>
              <h4 className="profile_main_info_title">Complete Order</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
