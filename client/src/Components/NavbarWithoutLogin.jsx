import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function NavbarWithoutLogin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
        <div>
          <li>
            <Link to="/signup" className="nav-elements">
              <i className="fa-solid fa-user-plus"></i>
              {/* <span>Sign Up</span> */}
            </Link>
          </li>
        </div>
        <div>
          <li>
            <Link to="/login" className="nav-elements">
              <i className="fa-solid fa-right-to-bracket"></i>
              {/* <span>Login</span> */}
            </Link>
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

export default NavbarWithoutLogin;
