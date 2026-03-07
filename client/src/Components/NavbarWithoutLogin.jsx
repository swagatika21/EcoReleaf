import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";

const NAV_LINKS = [
  { to: "/",      icon: "fa-solid fa-house",      label: "Home" },
  { to: "/about", icon: "fa-solid fa-leaf",        label: "About" },
];

function NavbarWithoutLogin() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="eco-nav">
      {/* Brand */}
      <Link to="/" className="eco-nav-brand">
        <i className="fa-brands fa-envira eco-nav-brand-icon" />
        <span>EcoReleaf</span>
      </Link>

      {/* Links */}
      <ul className={`eco-nav-list ${mobileOpen ? "eco-nav-list--open" : ""}`}>
        {NAV_LINKS.map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`eco-nav-link ${isActive(to) ? "eco-nav-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className={icon} />
              <span className="eco-nav-link-label">{label}</span>
            </Link>
          </li>
        ))}

        {/* Auth buttons */}
        <li className="eco-nav-auth">
          <Link to="/login" className="eco-nav-link" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-right-to-bracket" />
            <span className="eco-nav-link-label">Login</span>
          </Link>
          <Link to="/signup" className="eco-nav-signup" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-user-plus" />
            <span>Sign Up</span>
          </Link>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className={`eco-nav-hamburger ${mobileOpen ? "eco-nav-hamburger--open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

export default NavbarWithoutLogin;