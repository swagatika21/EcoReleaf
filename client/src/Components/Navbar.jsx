import { useContext, useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";
import Context from "../context/Context";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setLogin } = useContext(Context);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hasHero = ["/", "/about"].includes(location.pathname);

  // Dynamic links
  const navLinks = useMemo(() => {
    if (login) {
      return [
        { to: "/", icon: "fa-solid fa-house", label: "Home" },
        {
          to: "/airquality",
          icon: "fa-solid fa-smog",
          label: "Air Quality",
        },
        {
          to: "/pollution-history",
          icon: "fa-solid fa-clock-rotate-left",
          label: "History",
        },
      ];
    }

    return [
      { to: "/", icon: "fa-solid fa-house", label: "Home" },
      { to: "/about", icon: "fa-solid fa-leaf", label: "About" },
    ];
  }, [login]);

  // Scroll behavior
  useEffect(() => {
    if (login || !hasHero) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 60);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, hasHero, login]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    navigate("/");
  };

  return (
    <nav
      className={`eco-nav ${
        scrolled ? "eco-nav--solid" : "eco-nav--transparent"
      }`}
    >
      {/* Brand */}
      <Link to="/" className="eco-nav-brand">
        <i className="fa-brands fa-envira eco-nav-brand-icon" />
        <span>EcoReleaf</span>
      </Link>

      {/* Nav Links */}
      <ul className={`eco-nav-list ${mobileOpen ? "eco-nav-list--open" : ""}`}>
        {navLinks.map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`eco-nav-link ${
                isActive(to) ? "eco-nav-link--active" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <i className={icon} />
              <span className="eco-nav-link-label">{label}</span>
            </Link>
          </li>
        ))}

        {/* Auth Section */}
        {login ? (
          <li>
            <button className="eco-nav-logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket" />
              <span className="eco-nav-link-label">Logout</span>
            </button>
          </li>
        ) : (
          <li className="eco-nav-auth">
            <Link
              to="/login"
              className="eco-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-right-to-bracket" />
              <span className="eco-nav-link-label">Login</span>
            </Link>

            <Link
              to="/signup"
              className="eco-nav-signup"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-user-plus" />
              <span>Sign Up</span>
            </Link>
          </li>
        )}
      </ul>

      {/* Hamburger */}
      <button
        className={`eco-nav-hamburger ${
          mobileOpen ? "eco-nav-hamburger--open" : ""
        }`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;