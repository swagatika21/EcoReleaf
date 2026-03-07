import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";
import Context from "../context/Context";

const NAV_LINKS = [
  { to: "/", icon: "fa-solid fa-house", label: "Home" },
  { to: "/airquality", icon: "fa-solid fa-smog", label: "Air Quality" },
  { to: "/pollution-history", icon: "fa-solid fa-clock-rotate-left", label: "History" },
];

function NavbarWithLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const contextData = useContext(Context);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    contextData.setLogin(false);
    navigate("/");
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="eco-nav">

      {/* Brand */}
      <Link to="/" className="eco-nav-brand">
        <i className="fa-brands fa-envira eco-nav-brand-icon"></i>
        <span>EcoReleaf</span>
      </Link>

      {/* Nav Links */}
      <ul className={`eco-nav-list ${mobileOpen ? "eco-nav-list--open" : ""}`}>
        {NAV_LINKS.map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`eco-nav-link ${isActive(to) ? "eco-nav-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className={icon}></i>
              <span className="eco-nav-link-label">{label}</span>
            </Link>
          </li>
        ))}

        {/* Logout */}
        <li>
          <button className="eco-nav-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="eco-nav-link-label">Logout</span>
          </button>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className={`eco-nav-hamburger ${mobileOpen ? "eco-nav-hamburger--open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  );
}

export default NavbarWithLogin;