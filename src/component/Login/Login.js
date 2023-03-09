import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "../Sharder/NavBar/NavBar";
import laptop from "../../assets/Image/laptop.webp";
import man from "../../assets/Image/man.webp";
import shape1 from "../../assets/Image/shape-1.webp";
import shape2 from "../../assets/Image/shape-2.webp";
import shape3 from "../../assets/Image/shape-3.webp";
import shape4 from "../../assets/Image/shape-4.webp";
import { useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import "./Login.css";
import { AuthContext } from "../Context/UserContext";
import { toast } from "react-toastify";
const Login = () => {
  const shapes = [laptop, man, shape1, shape2, shape3, shape4];
  const [newUser, setNewUser] = useState(false);
  const [passicon, setpassicon] = useState(false);
  const [conPassicon, setConPassicon] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const [password, setpassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [valid, setValid] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signIn, createUser, updateName, setUser, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const confirmpassView = (e) => {
    setShowConPass(!showConPass);
    setConPassicon(!conPassicon);
  };
  const passView = (e) => {
    setShowPass(!showPass);
    setpassicon(!passicon);
  };

  const onSubmit = async (data) => {
    if (newUser && data.email && data.password) {
      createUser(data.email, data.password)
        .then((result) => {
          const user = result.user;
          updateName(data.name);
          setUser(user);
          toast("Register Complete");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast(errorMessage);
        });
    }
    if (!newUser && data.email && data.password) {
      signIn(data.email, data.password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          toast("Login  Successful");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast(errorMessage);
        });
    }
  };
  return (
    <>
      <NavBar />
      <section className="login-area">
        <Container>
          <div className="login-inner p-relative z-index-1">
            <div className="login-shape">
              {shapes.map((shape, idx) => (
                <img
                  src={shape}
                  alt="Shape"
                  key={idx}
                  className={`shape shape-${idx + 1}`}
                />
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div className="login-wrapper">
                  <div className="login-top text-center">
                    {!newUser ? (
                      <>
                        <h3 className="login-title">Hello Again</h3>
                        <p>Enter your credentials to acces your account.</p>
                      </>
                    ) : (
                      <>
                        <h3 className="login-title">Register Now!</h3>
                        <p>You can signup with you social account below</p>
                      </>
                    )}
                  </div>
                  <div className="login-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="login-input-wrapper">
                        {newUser && (
                          <div className="login-input-item">
                            <HiOutlineUser />
                            <input
                              {...register("name", { required: true })}
                              placeholder="Enter your name"
                            />
                            {errors.name && (
                              <span className="text-danger">
                                This field is required
                              </span>
                            )}
                          </div>
                        )}
                        <div className="login-input-item">
                          <HiOutlineMail />
                          <input
                            {...register("email", { required: true })}
                            placeholder="Enter your Email"
                          />
                          {errors.email && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="login-input-item">
                          <CiLock />
                          <input
                            {...register("password", { required: true })}
                            placeholder="Password"
                            type={showPass ? "text" : "password"}
                            onBlur={(e) => setpassword(e.target.value)}
                          />
                          <span onClick={passView} className="showPass">
                            {passicon ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                          </span>
                          {errors.password && (
                            <span className="text-danger">
                              This field is required
                            </span>
                          )}
                        </div>{" "}
                        {newUser && (
                          <div className="login-input-item">
                            <CiLock />
                            <input
                              {...register("confirmPassword", {
                                required: true,
                              })}
                              placeholder="Confirm Password"
                              type={showConPass ? "text" : "password"}
                              onChange={(e) => setconfirmPass(e.target.value)}
                            />
                            <span
                              onClick={confirmpassView}
                              className="showPass"
                            >
                              {conPassicon ? (
                                <HiOutlineEyeOff />
                              ) : (
                                <HiOutlineEye />
                              )}
                            </span>

                            <span className="text-danger"></span>
                          </div>
                        )}
                      </div>
                      {!newUser && (
                        <div className="login-option d-sm-flex justify-content-between">
                          <div className="login-remember">
                            <input type="checkbox" id="tp-remember" />
                            <label htmlFor="tp-remember">Remember me</label>
                          </div>
                          <div className="login-forgor">
                            <Link to="forgotpass">forgot password?</Link>
                          </div>
                        </div>
                      )}
                      <div className="login-btn">
                        <input
                          type="submit"
                          value={newUser ? "Register" : "Sign In"}
                          className="checkoutbtn w-100 mb-3"
                        />
                      </div>
                    </form>
                    <div className="login-register-now">
                      {newUser ? (
                        <p>
                          Already have an account?
                          {
                            <span onClick={() => setNewUser(!newUser)}>
                              Log in
                            </span>
                          }
                        </p>
                      ) : (
                        <p>
                          Don’t have an account?
                          {
                            <span onClick={() => setNewUser(!newUser)}>
                              Register Now
                            </span>
                          }
                        </p>
                      )}
                    </div>
                    {newUser && (
                      <div className="errorBox">
                        <PasswordChecklist
                          rules={["minLength", "number", "match"]}
                          minLength={5}
                          value={password}
                          valueAgain={confirmPass}
                          onChange={(isValid) => setValid(true)}
                          className={valid ? "text-success" : "text-danger"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Login;
