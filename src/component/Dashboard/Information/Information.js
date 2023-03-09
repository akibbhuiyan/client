import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/UserContext";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { SlScreenSmartphone, SlLocationPin } from "react-icons/sl";
import "./Information.css";
const Information = ({ fade }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className={`profile_Info ${fade}`}>
      <h3 className="profile_info-title">Personal Details</h3>
      <div className="profile_info_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-xxl-6 col-md-6">
              <div className="profile_input-box">
                <span className="icon">
                  <AiOutlineUser />
                </span>
                <input
                  {...register("name", { required: true })}
                  placeholder="name"
                  defaultValue={user?.name}
                />
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile_input-box">
                <span className="icon">
                  <AiOutlineMail />
                </span>
                <input
                  {...register("email", { required: true })}
                  placeholder="email"
                  defaultValue={user?.email}
                />
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile_input-box">
                <span className="icon">
                  <SlScreenSmartphone />
                </span>
                <input
                  {...register("phone", { required: true })}
                  placeholder="phone"
                  type="number"
                  defaultValue="0123 456 7889"
                />
                {errors.phone && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile_input-box">
                <span className="icon">
                  <SlLocationPin />
                </span>
                <input
                  {...register("loaction", { required: true })}
                  placeholder="Loaction"
                />
                {errors.loaction && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile_input-box">
                <textarea
                  {...register("bio", { required: true })}
                  defaultValue="Hi there, this is my bio..."
                ></textarea>
                {errors.bio && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile-btn">
                <button type="submit" className="checkoutbtn">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Information;
