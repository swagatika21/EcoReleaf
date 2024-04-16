import "../Styles/Nurseryprofile.css";
// import Navbar from "./Navbar";
import NavbarWithLogin from "./NavbarWithLogin";

export default function UserProfile() {
  return (
    <>
    <NavbarWithLogin />
      <h3 className="profile-head">Your Profile</h3>
      <div className="profile-container">
        <div className="profile-image-container">
          <img
            src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
            className="profile-image"
          />
          <div className="image-overlay">
            <button className="edit-pic-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>Edit Photo
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-item">
            <span>
            <i className="fa-solid fa-circle-user fa-2x"></i>
            </span>
            <span>
               Name: <span>ABC</span>
            </span>
            <button className="edit-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>

          <div className="profile-item">
            <span>
              <i className="fa-solid fa-envelope fa-2x"></i>
            </span>
            <span>
              Email: <span>ABC</span>
            </span>
            <button className="edit-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>

          <div className="profile-item">
            <span>
              <i className="fa-solid fa-location-dot fa-2x"></i>
            </span>
            <span>
             Address: <span>ABC</span>
            </span>
            <button className="edit-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>

          <div className="profile-item">
            <span>
              <i className="fa-solid fa-map-pin fa-2x"></i>
            </span>
            <span>
              Pin Code: <span>ABC</span>
            </span>
            <button className="edit-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>

          <div className="profile-item">
            <span>
              <i className="fa-solid fa-magnifying-glass-location fa-2x"></i>
            </span>
            <span>
             Type of Location: <span>ABC</span>
            </span>
            <button className="edit-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
