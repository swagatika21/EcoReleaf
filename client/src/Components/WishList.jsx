/* eslint-disable no-unused-vars */
import NavbarWithLogin from "./NavbarWithLogin";
import { useEffect, useState } from "react";
import "../Styles/Wishlist.css";
import { useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { dataEN } from "../language/Plants";
import { dataHI } from "../language/PlantsHindi";
import { dataOD } from "../language/PlantsOdia";

const PLANT_META = [
  { key: "Sunlight", icon: "fa-solid fa-sun",            label: "Sunlight" },
  { key: "water",    icon: "fa-solid fa-droplet",         label: "Water" },
  { key: "size",     icon: "fa-solid fa-ruler-vertical",  label: "Size" },
];

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(stored);
  }, []);

  const handleDelete = (Id) => {
    const updated = wishlistItems.filter((item) => item.Id !== Id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const renderRating = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaLeaf key={i} color={i < rating ? "#22c55e" : "#d1d5db"} size={13} />
    ));

  /* ── Empty state ── */
  if (wishlistItems.length === 0) {
    return (
      <>
        <NavbarWithLogin />
        <main className="wl-page">
          <div className="wl-empty">
            <img src="../Images/heart.png" alt="Empty wishlist" className="wl-empty-img" />
            <h3 className="wl-empty-title">Your wishlist is empty</h3>
            <p className="wl-empty-desc">
              Head back to recommendations and save the plants you love.
            </p>
            <button className="wl-btn wl-btn--primary" onClick={() => navigate("/plantrecom")}>
              <i className="fa-solid fa-seedling" />
              Browse Recommendations
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavbarWithLogin />

      <main className="wl-page">
        {/* ── Header ── */}
        <div className="wl-header">
          <span className="wl-eyebrow">Saved plants</span>
          <h1 className="wl-title">My Wishlist</h1>
          <p className="wl-subtitle">
            {wishlistItems.length} plant{wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="wl-grid">
          {wishlistItems.map((plant, i) => (
            <div
              className="wl-card"
              key={plant.Id}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Image */}
              <div className="wl-card-img-wrap">
                <img src={plant.image} alt={t(plant.name)} className="wl-card-img" />
                {/* Rating floats over image */}
                <div className="wl-card-rating">
                  {renderRating(plant.Rating)}
                </div>
              </div>

              {/* Body */}
              <div className="wl-card-body">
                <h3 className="wl-card-name">{t(plant.name)}</h3>

                <ul className="wl-card-meta">
                  {PLANT_META.map(({ key, icon, label }) => (
                    <li key={key} className="wl-card-meta-item">
                      <span className="wl-card-meta-icon">
                        <i className={icon} />
                      </span>
                      <span className="wl-card-meta-text">{t(plant[key])}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="wl-card-delete"
                  onClick={() => handleDelete(plant.Id)}
                  aria-label="Remove from wishlist"
                >
                  <i className="fa-solid fa-trash" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer action ── */}
        <div className="wl-actions">
          <button className="wl-btn wl-btn--outline" onClick={() => navigate("/plantrecom")}>
            <i className="fa-solid fa-seedling" />
            Browse More Plants
          </button>
        </div>
      </main>
    </>
  );
};

export default WishList;