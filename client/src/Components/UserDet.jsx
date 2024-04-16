import { useNavigate } from "react-router-dom";
import "../Styles/UserDet.css";
// import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import NavbarWithoutLogin from "./NavbarWithoutLogin";

export default function UserDet() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    location: "",
    pincode: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user-app")) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // console.log(values);

  const handleValidation = () => {
    console.log("validate");
    const { email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    if (handleValidation()) {
      const {
        fullname,
        email,
        password,
        phone,
        address,
        state,
        city,
        location,
        pincode,
      } = values;

      const selectedCheckboxes = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);
      
      const { data } = await axios.post(
        registerRoute,
        {
          fullname,
          email,
          password,
          phone,
          address,
          state,
          city,
          location,
          pincode,
          selectedCheckboxes
        },
        {
          withCredentials: true,
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user-app", JSON.stringify(data.user));
        navigate("/airquality",{state:values});
      }
    }
  };

  return (
    <>
      <NavbarWithoutLogin />
      <div className="main">
        <div className="image">
          <img src="../Images/userimg.png" alt="Form image" />
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="form">
            <div className="user-icon">
              <i className="fa-solid fa-circle-user fa-4x"></i>
            </div>

            <div className="head-user">USER DETAILS</div>
            <div className="form-body">
              <section className="basic">
                <div className="inp-field">
                  <label htmlFor="fname">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter Full Name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="Phonenum">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="confirmPwd">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="addr">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Pincode"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="inp-field">
                  <label>Type of Location</label>
                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" value="Balcony" />
                      Balcony
                    </label>
                    <label>
                      <input type="checkbox" value="Garden" />
                      Garden
                    </label>
                    <label>
                      <input type="checkbox" value="Farm" />
                      Farm
                    </label>
                  </div>
                </div>
              </section>

              <button className="user-reg">REGISTER</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
