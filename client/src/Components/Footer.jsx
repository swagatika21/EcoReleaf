import { useEffect } from "react";

const styles = `
  .eco-footer {
    background: #0a0f0d;
    color: white;
    padding: 96px 24px 0;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* ───────────────── Background ───────────────── */

  .eco-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 10% 20%, rgba(34,197,94,0.08), transparent 35%),
      radial-gradient(circle at 90% 80%, rgba(16,185,129,0.06), transparent 35%),
      radial-gradient(circle at 50% 50%, rgba(6,78,59,0.05), transparent 45%);
    pointer-events: none;
  }

  .eco-footer::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    opacity: 0.3;
  }

  .eco-footer-inner {
    position: relative;
    z-index: 1;

    max-width: 1280px;
    margin: 0 auto;
    padding: 0 12px;
  }

  /* ───────────────── Divider ───────────────── */

  .eco-footer-topline {
    height: 1px;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(34,197,94,0.4),
        rgba(16,185,129,0.3),
        transparent
      );

    margin-bottom: 72px;
    opacity: 0.8;
  }

  /* ───────────────── Grid ───────────────── */

  .eco-footer-grid {
    display: grid;

    grid-template-columns: 1.5fr 1fr 1fr 1.15fr;

    gap: 56px;

    padding-bottom: 72px;

    align-items: start;
  }

  .eco-footer-grid > div {
    display: flex;
    flex-direction: column;
    min-height: 240px;
  }

  /* ───────────────── Brand ───────────────── */

  .eco-brand-name {
    display: flex;
    align-items: center;
    gap: 10px;

    margin: 0 0 10px 0;

    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.03em;

    color: #f0fdf4;
  }

  .eco-brand-leaf {
    display: inline-block;
    animation: sway 3.5s ease-in-out infinite;
    transform-origin: bottom center;
  }

  @keyframes sway {
    0%, 100% { transform: rotate(0deg); }
    33% { transform: rotate(8deg); }
    66% { transform: rotate(-5deg); }
  }

  .eco-brand-tagline {
    margin: 0 0 20px 0;

    font-size: 11px;
    font-weight: 600;

    letter-spacing: 0.18em;
    text-transform: uppercase;

    color: #22c55e;
  }

  .eco-brand-desc {
    max-width: 320px;

    margin: 0 0 34px 0;

    color: #6b7280;

    font-size: 14px;
    line-height: 1.85;
  }

  /* ───────────────── Stats ───────────────── */

  .eco-stats {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .eco-stat {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    padding: 7px 15px;

    border-radius: 999px;

    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.16);

    color: #86efac;

    font-size: 12px;
    font-weight: 500;

    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease;
  }

  .eco-stat:hover {
    background: rgba(34,197,94,0.14);
    border-color: rgba(34,197,94,0.35);
    transform: translateY(-2px);
  }

  .eco-stat-dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;
    background: #22c55e;

    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }

    50% {
      opacity: 0.5;
      transform: scale(0.7);
    }
  }

  /* ───────────────── Section Headings ───────────────── */

  .eco-nav-label {
    margin: 0 0 22px 0;

    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;

    color: #f0fdf4;

    letter-spacing: -0.01em;
  }

  /* ───────────────── Links ───────────────── */

  .eco-nav-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .eco-nav-link {
    position: relative;

    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 7px 0;

    color: #6b7280;

    text-decoration: none;

    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;

    transition:
      color 0.25s ease,
      transform 0.25s ease;
  }

  .eco-nav-link::before {
    content: '';

    position: absolute;
    left: 0;
    bottom: 3px;

    width: 0;
    height: 1px;

    background: #22c55e;

    transition: width 0.3s ease;
  }

  .eco-nav-link:hover {
    color: #d1fae5;
    transform: translateX(4px);
  }

  .eco-nav-link:hover::before {
    width: 100%;
  }

  /* ───────────────── Contact ───────────────── */

  .eco-contact-item {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 16px;
  }

  .eco-contact-icon {
    width: 32px;
    height: 32px;

    border-radius: 10px;

    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.12);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 13px;

    flex-shrink: 0;
  }

  .eco-contact-text {
    color: #9ca3af;

    font-size: 14px;
    line-height: 1.5;
  }

  /* ───────────────── Socials ───────────────── */

  .eco-socials {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-top: 30px;
  }

  .eco-social-btn {
    width: 40px;
    height: 40px;

    border-radius: 12px;

    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);

    display: flex;
    align-items: center;
    justify-content: center;

    color: #9ca3af;

    text-decoration: none;

    font-size: 15px;

    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .eco-social-btn:hover {
    background: rgba(34,197,94,0.12);
    border-color: rgba(34,197,94,0.3);

    color: #22c55e;

    transform: translateY(-3px);

    box-shadow: 0 8px 20px rgba(34,197,94,0.15);
  }

  /* ───────────────── Bottom ───────────────── */

  .eco-footer-bottom {
    min-height: 72px;

    padding: 22px 0 28px;

    border-top: 1px solid rgba(255,255,255,0.05);

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    flex-wrap: wrap;
  }

  .eco-footer-copy {
    margin: 0;

    font-size: 13px;
    color: #4b5563;
  }

  .eco-footer-copy span {
    color: #22c55e;
  }

  .eco-footer-love {
    margin: 0;

    display: flex;
    align-items: center;
    gap: 5px;

    color: #374151;

    font-size: 12px;
  }

  .eco-footer-love .heart {
    display: inline-block;

    color: #22c55e;

    animation: heartbeat 1.8s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.2); }
    28% { transform: scale(1); }
    42% { transform: scale(1.15); }
    56% { transform: scale(1); }
  }

  /* ───────────────── Responsive ───────────────── */

  @media (max-width: 1024px) {
    .eco-footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
  }

  @media (max-width: 768px) {
    .eco-footer {
      padding: 72px 20px 0;
    }

    .eco-footer-topline {
      margin-bottom: 56px;
    }

    .eco-footer-grid {
      grid-template-columns: 1fr;
      gap: 44px;
    }

    .eco-footer-grid > div:first-child {
      align-items: center;
      text-align: center;
    }

    .eco-brand-desc {
      max-width: 100%;
    }

    .eco-stats {
      justify-content: center;
    }

    .eco-nav-label {
      margin-bottom: 18px;
    }

    .eco-footer-bottom {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      text-align: center;

      gap: 10px;
    }
  }
`;

function Footer() {
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!document.getElementById("eco-footer-styles")) {
      const tag = document.createElement("style");
      tag.id = "eco-footer-styles";
      tag.textContent = styles;
      document.head.appendChild(tag);
    }

    return () => {
      const tag = document.getElementById("eco-footer-styles");
      if (tag) tag.remove();
    };
  }, []);

  return (
    <footer className="eco-footer">
      <div className="eco-footer-inner">

        <div className="eco-footer-topline" />

        <div className="eco-footer-grid">

          {/* Brand */}
          <div>
            <h2 className="eco-brand-name">
              EcoReleaf
              <span className="eco-brand-leaf">🌿</span>
            </h2>

            <p className="eco-brand-tagline">
              Plant today. Breathe tomorrow.
            </p>

            <p className="eco-brand-desc">
              Helping communities plant trees and restore green cover across India
              — one sapling at a time.
            </p>

            <div className="eco-stats">
              <div className="eco-stat">
                <div className="eco-stat-dot" />
                12k+ Trees
              </div>

              <div className="eco-stat">
                <div
                  className="eco-stat-dot"
                  style={{ animationDelay: "0.5s" }}
                />
                80+ Nurseries
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="eco-nav-label">Explore</h3>

            <div className="eco-nav-links">
              {[
                ["Home", "/"],
                ["Nurseries", "/nurseries"],
                ["Plants", "/plants"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <a key={label} href={href} className="eco-nav-link">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="eco-nav-label">Resources</h3>

            <div className="eco-nav-links">
              {["Blog", "Plant Guide", "Community", "Support"].map((label) => (
                <a key={label} href="#" className="eco-nav-link">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eco-nav-label">Contact</h3>

            <div className="eco-contact-item">
              <div className="eco-contact-icon">✉️</div>

              <span className="eco-contact-text">
                support@ecoreleaf.com
              </span>
            </div>

            <div className="eco-contact-item">
              <div className="eco-contact-icon">📍</div>

              <span className="eco-contact-text">
                Bhubaneswar, Odisha, India
              </span>
            </div>

            <div className="eco-socials">

              <a
                href="#"
                className="eco-social-btn"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook" />
              </a>

              <a
                href="https://linkedin.com/in/swagatika-panda-b53069211"
                className="eco-social-btn"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin" />
              </a>

              <a
                href="#"
                className="eco-social-btn"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="eco-footer-bottom">

          <p className="eco-footer-copy">
            © {year} <span>EcoReleaf</span>. All rights reserved.
          </p>

          <p className="eco-footer-love">
            Made with <span className="heart">♥</span> for the planet
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;