import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Styles/NurseryDet.css";
import { nRegisterRoute } from "../utils/APIRoutes";
import { useContext, useEffect, useState } from "react";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Context from "../context/Context";

export default function NurseryDet() {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [values, setValues] = useState({
    nurseryname: "",
    ownername: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    location: "",
    price: "",
    delivery: "",
    pincodeNursery: "",
    profNursery: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    // console.log(localStorage.getItem("nursery-app"));
    if (localStorage.getItem("nursery-app")) {
      navigate("/nursery");
    } 
    // else {
    //   navigate("/login");
    // }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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
    console.log(values);
    if (handleValidation()) {
      const {
        nurseryname,
        ownername,
        email,
        password,
        phone,
        address,
        state,
        city,
        location,
        price,
        delivery,
        pincodeNursery,
        profNursery,
      } = values;

      const selectedCheckboxes = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);

      const { data } = await axios.post(
        nRegisterRoute,
        {
          nurseryname,
          ownername,
          email,
          password,
          phone,
          address,
          state,
          city,
          selectedCheckboxes,
          location,
          priceRange:price,
          delivery,
          pincode:pincodeNursery,
          profNursery,
        },
        {
          withCredentials: true,
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("nursery-app", JSON.stringify(data.user));
        navigate("/nurseryprofile");
      }
    }
  };

  return (
    <>
      <NavbarWithoutLogin />
      <div className="main">
        <div className="image">
          <img src="../Images/nurseryimg.png" alt="Form image" />
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="nursery-icon">
            <i className="fa-brands fa-4x fa-pagelines"></i>
          </div>

          <div className="head">NURSERY DETAILS</div>
          <div className="form-body nursery-basic">
            <div className="inp-field">
              <label htmlFor="Nname">Nursery Name</label>
              <input
                type="text"
                name="nurseryname"
                placeholder="Enter Nursery Name"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="ownername">Owner Name</label>
              <input
                type="text"
                name="ownername"
                placeholder="Enter Owner Name"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="inp-field">
              <label htmlFor="Phonenum">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="confirmPwd">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="inp-field">
              <label htmlFor="addr">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter State"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label htmlFor="pincodeNursery">Pin code</label>
              <input
                type="text"
                name="pincodeNursery"
                placeholder="Enter Pin code"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="inp-field">
              <label>Plant Speciality</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" value="Herbal Plants" />
                  Herbal Plants
                </label>
                <label>
                  <input type="checkbox" value="Floral Plants" />
                  Floral Plants
                </label>
                <label>
                  <input type="checkbox" value="Vegetables" />
                  Vegetables
                </label>
                <label>
                  <input type="checkbox" value="Others" />
                  Others
                </label>
              </div>
            </div>

            <div className="inp-field">
              <label htmlFor="photo">Upload Plant/Nursery Photo</label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                name="profNursery"
              />
            </div>

            <div className="inp-field">
              <label htmlFor="google-loc">Enter Google location</label>
              <input
                type="text"
                id="google-loc"
                name="location"
                placeholder="https://maps.app.goo.gl/ABC"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="inp-field">
              <label htmlFor="Delivery">Do you deliver</label>
              <select
                name="delivery"
                onChange={(e) => handleChange(e)}
                required
              >
                <option>Choose an option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="inp-field">
              <label htmlFor="price-range">Enter Price range</label>
              <input
                type="tel"
                id="price-range"
                name="price"
                placeholder="eg Rs 300 - 400"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <button className="reg">ENLIST NURSERY</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
