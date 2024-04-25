import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
// import Navbar from "./Navbar";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Context from "../context/Context";

const Login = () => {
  const navigate = useNavigate();
  const contextData=useContext(Context)
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(
        loginRoute,
        {
          email,
          password,
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
        contextData.setLogin("true")
        navigate("/airquality");
      }
    }
  };

  return (
    <>
      <NavbarWithoutLogin />

      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit">Login</button>
          <p className="login-alt">
            Not a user? <a href="/">Register</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
