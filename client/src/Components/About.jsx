import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/About.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const STATS = [
  { value: "12,000+", label: "Trees Planted",    icon: "🌳" },
  { value: "80+",     label: "Nurseries Listed",  icon: "🏡" },
  { value: "3",       label: "Languages Supported",icon: "🌐" },
  { value: "4",       label: "Cities & Growing",  icon: "📍" },
];

const VALUES = [
  {
    num: "01",
    title: "Rooted in Purpose",
    body: "Every feature we build starts with one question: does this help someone plant a tree? We don't add complexity for its own sake — only what genuinely moves the needle for the planet.",
    icon: "🌱",
  },
  {
    num: "02",
    title: "Data That Breathes",
    body: "We believe environmental data should be accessible to everyone, not just researchers. Real-time AQI, species mapping, and local nursery proximity — all in one place, in your language.",
    icon: "🌬️",
  },
  {
    num: "03",
    title: "Community First",
    body: "EcoReleaf works because nursery owners and contributors work together. We are a bridge, not a gatekeeper — connecting people who care about what grows.",
    icon: "🤝",
  },
];

const TEAM = [
  {
    name: "Swagatika Panda",
    role: "Founder & Full-Stack Developer",
    bio: "Built EcoReleaf from the ground up with a B.Tech in Information Technology from VSSUT Burla. Gold Medal recipient for Best B.Tech Project.",
    avatar: "SP",
    location: "Bhubaneswar, Odisha",
  },
];

export default function About() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ab-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".ab-reveal").forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main className="ab-page">

        {/* ── Hero ── */}
        <section className="ab-hero">
          <div className="ab-hero-bg">
            <div className="ab-hero-orb ab-hero-orb--1" />
            <div className="ab-hero-orb ab-hero-orb--2" />
            <div className="ab-hero-orb ab-hero-orb--3" />
            <div className="ab-hero-grain" />
          </div>

          <div className="ab-hero-content">
            <span className="ab-eyebrow ab-reveal">Our Story</span>
            <h1 className="ab-hero-title ab-reveal">
              We believe in a <br />
              <em>greener tomorrow.</em>
            </h1>
            <p className="ab-hero-desc ab-reveal">
              EcoReleaf started as a final-year project and became a mission. A platform
              where air quality data meets local nurseries, and where a single sapling
              can spark a movement.
            </p>
            <div className="ab-hero-actions ab-reveal">
              <button className="ab-btn ab-btn--primary" onClick={() => navigate("/signup")}>
                Join the mission
              </button>
              <button className="ab-btn ab-btn--ghost" onClick={() => navigate("/nursery")}>
                Browse nurseries
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="ab-scroll">
            <div className="ab-scroll-track"><div className="ab-scroll-thumb" /></div>
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Origin story ── */}
        <section className="ab-origin">
          <div className="ab-origin-inner">
            <div className="ab-origin-text ab-reveal">
              <span className="ab-section-label">How it began</span>
              <h2 className="ab-section-title">
                A B.Tech project<br />that refused to stop.
              </h2>
              <p>
                EcoReleaf was born in Bhubaneswar, Odisha — a city where rapid urbanisation
                and rising pollution levels make green spaces more precious than ever. What began
                as a research project on air quality and urban planting became a published paper,
                a Gold Medal, and eventually a platform people actually use.
              </p>
              <p>
                The core insight was simple: people <em>want</em> to plant trees and support
                local nurseries — they just do not know where to start. EcoReleaf connects those
                dots. Check your local AQI. Discover which plants thrive there. Find a nursery
                half a kilometre away. Done.
              </p>
            </div>

            <div className="ab-origin-visual ab-reveal">
              <div className="ab-origin-card">
                <div className="ab-origin-card-line" />
                <blockquote className="ab-origin-quote">
                  {"The best time to plant a tree was twenty years ago. The second best time is now."}
                </blockquote>
                <cite className="ab-origin-cite">— Chinese Proverb</cite>
              </div>
              <div className="ab-origin-badge">
                <span className="ab-origin-badge-text">Est.</span>
                <span className="ab-origin-badge-year">2024</span>
                <span className="ab-origin-badge-place">Bhubaneswar</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="ab-stats">
          <div className="ab-stats-grid">
            {STATS.map(({ value, label, icon }, i) => (
              <div
                className="ab-stat ab-reveal"
                key={label}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="ab-stat-icon">{icon}</span>
                <span className="ab-stat-value">{value}</span>
                <span className="ab-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Values ── */}
        <section className="ab-values">
          <div className="ab-values-header ab-reveal">
            <span className="ab-section-label">What drives us</span>
            <h2 className="ab-section-title">Our values</h2>
          </div>

          <div className="ab-values-grid">
            {VALUES.map(({ num, title, body, icon }, i) => (
              <div
                className="ab-value-card ab-reveal"
                key={num}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="ab-value-top">
                  <span className="ab-value-num">{num}</span>
                  <span className="ab-value-icon">{icon}</span>
                </div>
                <h3 className="ab-value-title">{title}</h3>
                <p className="ab-value-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section className="ab-team">
          <div className="ab-team-header ab-reveal">
            <span className="ab-section-label">Behind the leaf</span>
            <h2 className="ab-section-title">The team</h2>
          </div>

          <div className="ab-team-grid">
            {TEAM.map(({ name, role, bio, avatar, location }) => (
              <div className="ab-team-card ab-reveal" key={name}>
                <div className="ab-team-avatar-wrap">
                  <div className="ab-team-avatar">{avatar}</div>
                  <div className="ab-team-avatar-ring" />
                </div>
                <div className="ab-team-info">
                  <h3 className="ab-team-name">{name}</h3>
                  <span className="ab-team-role">{role}</span>
                  <p className="ab-team-bio">{bio}</p>
                  <div className="ab-team-location">
                    <i className="fa-solid fa-location-dot" />
                    {location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-cta ab-reveal">
          <div className="ab-cta-inner">
            <div className="ab-cta-bg-leaf">🌿</div>
            <span className="ab-section-label">Ready?</span>
            <h2 className="ab-cta-title">Plant your first tree today.</h2>
            <p className="ab-cta-sub">
              Join thousands of contributors and nursery owners already making a difference.
            </p>
            <div className="ab-cta-actions">
              <button className="ab-btn ab-btn--primary ab-btn--lg" onClick={() => navigate("/signup")}>
                <i className="fa-solid fa-seedling" /> Get started — it&apos;s free
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}