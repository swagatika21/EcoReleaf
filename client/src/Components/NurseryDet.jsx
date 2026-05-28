/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Styles/NurseryDet.css";
import { nRegisterRoute } from "../utils/APIRoutes";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import Navbar from "./Navbar";

const SPECIALITIES = ["Herbal Plants", "Floral Plants", "Vegetables", "Others"];

const FIELDS_BASIC = [
  { name: "nurseryname", label: "Nursery Name",   type: "text",  placeholder: "Green Roots Nursery" },
  { name: "ownername",   label: "Owner Name",     type: "text",  placeholder: "Your full name" },
  { name: "phone",       label: "Phone Number",   type: "tel",   placeholder: "10-digit number" },
  { name: "email",       label: "Email",          type: "email", placeholder: "owner@nursery.com" },
  { name: "password",    label: "Password",       type: "password", placeholder: "Min. 8 characters", isPwd: true },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter password", isPwd: true },
];

const FIELDS_LOCATION = [
  { name: "address",       label: "Address",   type: "text", placeholder: "Street / Locality" },
  { name: "state",         label: "State",     type: "text", placeholder: "e.g. Odisha" },
  { name: "city",          label: "City",      type: "text", placeholder: "e.g. Bhubaneswar" },
  { name: "pincodeNursery",label: "Pincode",   type: "text", placeholder: "6-digit pincode" },
  { name: "location",      label: "Google Maps Link", type: "text", placeholder: "https://maps.app.goo.gl/…", full: true },
];

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function NurseryDet() {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  const [values, setValues] = useState({
    nurseryname: "", role: "nursery", ownername: "", email: "",
    password: "", confirmPassword: "", phone: "", address: "",
    state: "", city: "", location: "", price: "", delivery: "",
    pincodeNursery: "", profNursery: "",
  });
  const [specialities, setSpecialities] = useState([]);
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [step, setStep]               = useState(1); // 1=basic, 2=location/details

  useEffect(() => {
    if (localStorage.getItem("nursery-app")) navigate("/nursery");
  }, []);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleSpeciality = (val) =>
    setSpecialities((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    );

  const handleValidation = () => {
    const { nurseryname, ownername, email, password, confirmPassword, phone, pincodeNursery } = values;
    if (!nurseryname.trim()) { toast.error("Nursery name is required.", toastOptions); return false; }
    if (!ownername.trim())   { toast.error("Owner name is required.", toastOptions); return false; }
    if (!email.trim())       { toast.error("Email is required.", toastOptions); return false; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters.", toastOptions); return false; }
    if (password !== confirmPassword) { toast.error("Passwords do not match.", toastOptions); return false; }
    if (!/^\d{10}$/.test(phone)) { toast.error("Enter a valid 10-digit phone number.", toastOptions); return false; }
    if (!/^\d{6}$/.test(pincodeNursery)) { toast.error("Enter a valid 6-digit pincode.", toastOptions); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    setLoading(true);
    try {
      const { confirmPassword: _, ...payload } = values;
      const { data } = await axios.post(
        nRegisterRoute,
        { ...payload, priceRange: values.price, pincodeNursery: values.pincodeNursery, selectedCheckboxes: specialities },
        { withCredentials: true }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("nursery-app", JSON.stringify(data.user));
        navigate("/nurseryprofile");
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

      <main className="nd-page">
        {/* ── Left aside ── */}
        <aside className="nd-aside">
          <div className="nd-aside-orb nd-aside-orb--1" />
          <div className="nd-aside-orb nd-aside-orb--2" />
          <img src="../Images/nurseryimg.png" alt="Nursery" className="nd-aside-img" />
          <div className="nd-aside-overlay">
            <div className="nd-aside-content">
              <h2 className="nd-aside-title">List your nursery.<br />Reach more growers.</h2>
              <p className="nd-aside-sub">
                Join EcoReleaf and connect with contributors looking for exactly what you grow.
              </p>
              {/* Step indicator */}
              <div className="nd-steps">
                <div className={`nd-step ${step >= 1 ? "nd-step--active" : ""}`}>
                  <div className="nd-step-circle">1</div>
                  <span>Basic Info</span>
                </div>
                <div className="nd-step-line" />
                <div className={`nd-step ${step >= 2 ? "nd-step--active" : ""}`}>
                  <div className="nd-step-circle">2</div>
                  <span>Location & Details</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Form panel ── */}
        <div className="nd-form-panel">
          <div className="nd-form-inner">

            <div className="nd-form-header">
              <div className="nd-form-icon">
                <i className="fa-brands fa-pagelines" />
              </div>
              <span className="nd-eyebrow">Nursery Registration</span>
              <h1 className="nd-form-title">
                {step === 1 ? "Basic information" : "Location & offerings"}
              </h1>
              <p className="nd-form-sub">
                Already have an account?{" "}
                <a href="/login" className="nd-link">Sign in</a>
              </p>
            </div>

            {/* Role badge */}
            <div className="nd-role-badge">
              <i className="fa-solid fa-store" />
              Registering as Nursery Owner
            </div>

            <form className="nd-form" onSubmit={handleSubmit}>

              {/* ── STEP 1: Basic info ── */}
              {step === 1 && (
                <div className="nd-fields-grid">
                  {FIELDS_BASIC.map(({ name, label, type, placeholder, isPwd }) => {
                    const isPassword = name === "password";
                    const isConfirm  = name === "confirmPassword";
                    const inputType  =
                      isPassword ? (showPwd ? "text" : "password") :
                      isConfirm  ? (showConfirm ? "text" : "password") : type;
                    return (
                      <div className="nd-field" key={name}>
                        <label className="nd-label" htmlFor={name}>{label}</label>
                        <div className="nd-input-wrap">
                          <input
                            id={name}
                            className="nd-input"
                            type={inputType}
                            name={name}
                            placeholder={placeholder}
                            value={values[name]}
                            onChange={handleChange}
                            required
                          />
                          {isPwd && (
                            <button
                              type="button"
                              className="nd-toggle-pwd"
                              onClick={() => isPassword ? setShowPwd(p => !p) : setShowConfirm(p => !p)}
                              aria-label="Toggle password"
                            >
                              <i className={`fa-solid ${(isPassword ? showPwd : showConfirm) ? "fa-eye-slash" : "fa-eye"}`} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── STEP 2: Location & details ── */}
              {step === 2 && (
                <div className="nd-fields-grid">
                  {FIELDS_LOCATION.map(({ name, label, type, placeholder, full }) => (
                    <div className={`nd-field ${full ? "nd-field--full" : ""}`} key={name}>
                      <label className="nd-label" htmlFor={name}>{label}</label>
                      <div className="nd-input-wrap">
                        <input
                          id={name}
                          className="nd-input"
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={values[name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  {/* Specialities */}
                  <div className="nd-field nd-field--full">
                    <label className="nd-label">Plant Speciality</label>
                    <div className="nd-checkboxes">
                      {SPECIALITIES.map((s) => (
                        <label
                          key={s}
                          className={`nd-checkbox-pill ${specialities.includes(s) ? "nd-checkbox-pill--checked" : ""}`}
                        >
                          <input
                            type="checkbox"
                            value={s}
                            checked={specialities.includes(s)}
                            onChange={() => toggleSpeciality(s)}
                            className="nd-checkbox-hidden"
                          />
                          <i className="fa-solid fa-check nd-check-icon" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="nd-field">
                    <label className="nd-label" htmlFor="delivery">Delivery Available?</label>
                    <div className="nd-input-wrap nd-select-wrap">
                      <select
                        id="delivery"
                        name="delivery"
                        className="nd-input nd-select"
                        value={values.delivery}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <i className="fa-solid fa-chevron-down nd-select-chevron" />
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="nd-field">
                    <label className="nd-label" htmlFor="price">Price Range</label>
                    <div className="nd-input-wrap">
                      <input
                        id="price"
                        className="nd-input"
                        type="text"
                        name="price"
                        placeholder="e.g. ₹300 – ₹1200"
                        value={values.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Photo upload */}
                  <div className="nd-field nd-field--full">
                    <label className="nd-label" htmlFor="profNursery">Nursery Photo (optional)</label>
                    <label className="nd-upload" htmlFor="profNursery">
                      <i className="fa-solid fa-cloud-arrow-up nd-upload-icon" />
                      <span className="nd-upload-text">
                        {values.profNursery ? "Photo selected ✓" : "Click to upload an image"}
                      </span>
                      <input
                        id="profNursery"
                        type="file"
                        accept="image/*"
                        name="profNursery"
                        className="nd-upload-input"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* ── Navigation buttons ── */}
              <div className="nd-form-nav">
                {step === 1 && (
                  <button
                    type="button"
                    className="nd-btn nd-btn--primary nd-btn--full"
                    onClick={() => setStep(2)}
                  >
                    Continue <i className="fa-solid fa-arrow-right" />
                  </button>
                )}

                {step === 2 && (
                  <>
                    <button
                      type="button"
                      className="nd-btn nd-btn--outline"
                      onClick={() => setStep(1)}
                    >
                      <i className="fa-solid fa-arrow-left" /> Back
                    </button>
                    <button
                      type="submit"
                      className="nd-btn nd-btn--primary"
                      disabled={loading}
                    >
                      {loading
                        ? <><i className="fa-solid fa-spinner fa-spin" /> Enlisting…</>
                        : <><i className="fa-solid fa-store" /> Enlist Nursery</>
                      }
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
}