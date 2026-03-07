import { useNavigate } from "react-router-dom";
import "../Styles/UserDet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import Context from "../context/Context";

const FIELDS = [
  { name: "fullname",        label: "Full Name",       type: "text",     placeholder: "Jane Doe" },
  { name: "phone",           label: "Phone Number",    type: "tel",      placeholder: "+91 98765 43210" },
  { name: "email",           label: "Email",           type: "email",    placeholder: "jane@example.com" },
  { name: "password",        label: "Password",        type: "password", placeholder: "Min. 8 characters" },
  { name: "confirmPassword", label: "Confirm Password",type: "password", placeholder: "Re-enter password" },
  { name: "address",         label: "Address",         type: "text",     placeholder: "Street / Locality" },
  { name: "state",           label: "State",           type: "text",     placeholder: "e.g. Odisha" },
  { name: "city",            label: "City",            type: "text",     placeholder: "e.g. Bhubaneswar" },
  { name: "pincode",         label: "Pincode",         type: "text",     placeholder: "6-digit pincode" },
];

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function UserDet() {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  const [values, setValues] = useState({
    fullname: "", email: "", password: "", confirmPassword: "",
    phone: "", address: "", state: "", city: "", pincode: "", role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-app")) navigate("/");
  }, []);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleValidation = () => {
    const { fullname, email, password, confirmPassword, phone, pincode } = values;
    if (!fullname.trim()) { toast.error("Full name is required.", toastOptions); return false; }
    if (!email.trim())    { toast.error("Email is required.", toastOptions); return false; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters.", toastOptions); return false; }
    if (password !== confirmPassword) { toast.error("Passwords do not match.", toastOptions); return false; }
    if (!/^\d{10}$/.test(phone)) { toast.error("Enter a valid 10-digit phone number.", toastOptions); return false; }
    if (!/^\d{6}$/.test(pincode)) { toast.error("Enter a valid 6-digit pincode.", toastOptions); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    setLoading(true);
    try {
      const { confirmPassword: _, ...payload } = values;
      const { data } = await axios.post(registerRoute, payload, { withCredentials: true });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("user-app", JSON.stringify(data.user));
        contextData.setLogin(true);
        navigate("/airquality", { state: values });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarWithoutLogin />

      <main className="ud-page">
        {/* ── Left panel ── */}
        <aside className="ud-aside">
          <img src="../Images/userimg.png" alt="Registration" className="ud-aside-img" />
          <div className="ud-aside-overlay">
            <div className="ud-aside-text">
              <span className="ud-aside-eyebrow">Join EcoReleaf</span>
              <h2 className="ud-aside-title">Plant a seed.<br />Change the world.</h2>
              <p className="ud-aside-sub">
                Create your account and start connecting with nurseries, tracking air quality, and growing a greener tomorrow.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Form panel ── */}
        <div className="ud-form-panel">
          <div className="ud-form-inner">
            {/* Header */}
            <div className="ud-form-header">
              <div className="ud-form-icon">
                <i className="fa-solid fa-circle-user" />
              </div>
              <span className="ud-eyebrow">New Account</span>
              <h1 className="ud-form-title">Create your profile</h1>
              <p className="ud-form-sub">
                Already have an account?{" "}
                <a href="/login" className="ud-form-link">Sign in</a>
              </p>
            </div>

            {/* Role badge */}
            <div className="ud-role-badge">
              <i className="fa-solid fa-seedling" />
              Registering as Contributor
            </div>

            {/* Fields */}
            <form onSubmit={handleSubmit} className="ud-form">
              <div className="ud-fields-grid">
                {FIELDS.map(({ name, label, type, placeholder }) => {
                  const isPwd = name === "password";
                  const isConfirm = name === "confirmPassword";
                  const inputType =
                    isPwd ? (showPwd ? "text" : "password") :
                    isConfirm ? (showConfirm ? "text" : "password") :
                    type;

                  return (
                    <div className="ud-field" key={name}>
                      <label className="ud-label" htmlFor={name}>{label}</label>
                      <div className="ud-input-wrap">
                        <input
                          id={name}
                          className="ud-input"
                          type={inputType}
                          name={name}
                          placeholder={placeholder}
                          value={values[name]}
                          onChange={handleChange}
                          required
                        />
                        {(isPwd || isConfirm) && (
                          <button
                            type="button"
                            className="ud-toggle-pwd"
                            onClick={() => isPwd ? setShowPwd(p => !p) : setShowConfirm(p => !p)}
                            aria-label="Toggle password visibility"
                          >
                            <i className={`fa-solid ${(isPwd ? showPwd : showConfirm) ? "fa-eye-slash" : "fa-eye"}`} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="ud-submit" type="submit" disabled={loading}>
                {loading ? (
                  <><i className="fa-solid fa-spinner fa-spin" /> Creating account…</>
                ) : (
                  <><i className="fa-solid fa-user-plus" /> Create Account</>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
}