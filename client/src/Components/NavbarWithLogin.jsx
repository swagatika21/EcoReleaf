import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function NavbarWithLogin() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className={`navbar ${mobileMenuOpen ? "collapsed" : ""}`}>
      <div className="logo">
        <i className="fa-brands fa-envira"></i>
        EcoReleaf
      </div>
      <ul className={`nav-list ${mobileMenuOpen ? "open" : ""}`}>
        <div>
          <li>
            <Link to="/" className="nav-elements">
              <i className="fa-solid fa-house "></i>
              {/* <span>Home</span> */}
            </Link>
          </li>
        </div>
        {/* user profile */}
        {/* <div>
          <li className="nav-elements">
            <Link to="/UserProfile" className="nav-link">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
          </li>
        </div> */}
        <div>
          <li className="nav-elements">
            <Link to="/airquality" className="nav-link">
              <i className="fa-solid fa-smog"></i> 
            </Link>
          </li>
        </div>
        <div>
          <li className="nav-elements">
            <Link to="/pollution-history" className="nav-link">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </Link>
          </li>
        </div>
        <div>
          <li className="nav-elements">
            <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
            {/* <span >Logout</span> */}
          </li>
        </div>
      </ul>
      <div
        className={`mobile-menu-button ${mobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
      >
        <i className="fa-solid fa-bars bar fa-2x"></i>
      </div>
    </nav>
  );
}

export default NavbarWithLogin;
