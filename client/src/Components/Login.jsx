/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import Context from "../context/Context";
import Navbar from "./Navbar";


const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  const [values, setValues] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nursery-app") || localStorage.getItem("user-app")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleValidation = () => {
    const { email, password } = values;
    if (!email.trim()) { toast.error("Email is required.", toastOptions); return false; }
    if (!password)     { toast.error("Password is required.", toastOptions); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        loginRoute,
        { email: values.email, password: values.password },
        { withCredentials: true }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        const key = data.user.role === "nursery" ? "nursery-app" : "user-app";
        localStorage.setItem(key, JSON.stringify(data.user));
        contextData.setLogin("true");
        navigate("/airquality");
      }
    } catch {
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <main className="lg-page">
        {/* Left decorative panel */}
        <aside className="lg-aside">
          <div className="lg-aside-orb lg-aside-orb--1" />
          <div className="lg-aside-orb lg-aside-orb--2" />
          <div className="lg-aside-content">
            <span className="lg-aside-leaf">🌿</span>
            <h2 className="lg-aside-title">Welcome back<br />to EcoReleaf.</h2>
            <p className="lg-aside-sub">
              Your green journey continues here. Check air quality, discover nurseries, and keep growing.
            </p>
            <div className="lg-aside-pills">
              <span className="lg-aside-pill"><span className="lg-aside-pill-dot" />Live AQI data</span>
              <span className="lg-aside-pill"><span className="lg-aside-pill-dot" />Plant recommendations</span>
              <span className="lg-aside-pill"><span className="lg-aside-pill-dot" />Local nurseries</span>
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <div className="lg-form-panel">
          <div className="lg-form-inner">

            <div className="lg-form-header">
              <span className="lg-eyebrow">Sign in</span>
              <h1 className="lg-title">Welcome back</h1>
              <p className="lg-subtitle">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="lg-link">Create one free</Link>
              </p>
            </div>

            <form className="lg-form" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="lg-field">
                <label className="lg-label" htmlFor="email">Email address</label>
                <div className="lg-input-wrap">
                  <i className="fa-solid fa-envelope lg-input-icon" />
                  <input
                    id="email"
                    className="lg-input"
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lg-field">
                <div className="lg-label-row">
                  <label className="lg-label" htmlFor="password">Password</label>
                  <a href="#" className="lg-forgot">Forgot password?</a>
                </div>
                <div className="lg-input-wrap">
                  <i className="fa-solid fa-lock lg-input-icon" />
                  <input
                    id="password"
                    className="lg-input lg-input--pwd"
                    type={showPwd ? "text" : "password"}
                    name="password"
                    placeholder="Your password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="lg-toggle-pwd"
                    onClick={() => setShowPwd((p) => !p)}
                    aria-label="Toggle password"
                  >
                    <i className={`fa-solid ${showPwd ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button className="lg-submit" type="submit" disabled={loading}>
                {loading
                  ? <><i className="fa-solid fa-spinner fa-spin" /> Signing in…</>
                  : <><i className="fa-solid fa-right-to-bracket" /> Sign In</>
                }
              </button>
            </form>

            {/* Divider */}
            <div className="lg-divider">
              <span className="lg-divider-line" />
              <span className="lg-divider-text">or register as</span>
              <span className="lg-divider-line" />
            </div>

            {/* Register options */}
            <div className="lg-register-opts">
              <Link to="/signup" className="lg-reg-btn">
                <i className="fa-solid fa-seedling" /> Contributor
              </Link>
              <Link to="/nurserysignup" className="lg-reg-btn">
                <i className="fa-solid fa-store" /> Nursery Owner
              </Link>
            </div>

          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
};

export default Login;