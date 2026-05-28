/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Landing.css";
import ProdDesc from "./ProdDesc";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Context from "../context/Context";

const FEATURES = [
  {
    num: "01",
    title: "Join the Movement",
    desc: "Register as a Nursery Owner or Contributor and become part of the green revolution shaping a cleaner tomorrow.",
  },
  {
    num: "02",
    title: "Explore & Showcase",
    desc: "Discover Air Quality Index data for plants as a contributor, or showcase your nursery profile to reach eco-conscious customers.",
  },
  {
    num: "03",
    title: "Connect & Impact",
    desc: "Receive personalized plant recommendations and connect with nurseries to make a tangible, positive impact on the environment.",
  },
];

function Landing() {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const user = JSON.parse(localStorage.getItem("user-app"));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {user ? <Navbar /> : <Navbar />}

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-bg">
          <img src="../Images/leafbg.png" className="hero-img" alt="Green background" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          {user && (
            <div className="hero-welcome">
              <span className="hero-welcome-dot" />
              Welcome back, <strong>{user.fullname}</strong>
            </div>
          )}

          <h1 className="hero-headline">
            Plant Today.<br />
            <span className="hero-accent">Breathe Tomorrow.</span>
          </h1>

          <blockquote className="hero-quote">
            To plant a garden is to believe in tomorrow.
          </blockquote>

          <p className="hero-sub">
            Join EcoReleaf as we combat pollution by making the earth a greener, healthier place — one tree at a time.
          </p>

          {!user && (
            <div className="hero-cta">
              <p className="hero-cta-label">Join us as</p>
              <div className="hero-buttons">
                <button className="hero-btn hero-btn--primary" onClick={() => navigate("/signup")}>
                  <span className="hero-btn-icon">🌱</span>
                  Contributor
                </button>
                <button className="hero-btn hero-btn--outline" onClick={() => navigate("/nurserysignup")}>
                  <span className="hero-btn-icon">🏡</span>
                  Nursery Owner
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Product Description ── */}
      <ProdDesc />

      {/* ── Features ── */}
      <section className="features-section">
        <div className="features-header">
          <span className="features-eyebrow">How it works</span>
          <h2 className="features-title">Three steps to a greener planet</h2>
        </div>

        <div className="features-grid">
          {FEATURES.map(({ num, title, desc }) => (
            <div className="feature-card" key={num}>
              <div className="feature-num">{num}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
              <button onClick={scrollToTop} className="feature-btn">
                Join Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Landing;