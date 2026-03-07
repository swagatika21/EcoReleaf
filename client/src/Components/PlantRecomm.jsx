/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarWithLogin from "./NavbarWithLogin";
import "../Styles/PlantRecomm.css";
import { FaLeaf } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { dataEN } from "../language/Plants";
import { dataHI } from "../language/PlantsHindi";
import { dataOD } from "../language/PlantsOdia";

const LANGUAGES = [
  { value: "EN", label: "English" },
  { value: "HI", label: "Hindi" },
  { value: "OD", label: "Odia" },
];

const PlantRecommendation = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get("name");

  const [jsonData, setJsonData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [language, setLanguage] = useState("EN");
  const [addedIds, setAddedIds] = useState(new Set());
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("user-app")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const data = language === "EN" ? dataEN : language === "HI" ? dataHI : dataOD;
    setJsonData(data);
  }, [language]);

  const addToWishlist = (plant) => {
    if (addedIds.has(plant.Id)) return;
    setWishlist((prev) => [...prev, plant]);
    setAddedIds((prev) => new Set(prev).add(plant.Id));
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    stored.push(plant);
    localStorage.setItem("wishlist", JSON.stringify(stored));
    toast.success("Added to wishlist!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  const renderRating = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaLeaf key={i} color={i < rating ? "#22c55e" : "#d1d5db"} size={13} />
    ));

  const sorted = [...jsonData].sort((a, b) => b.Rating - a.Rating);

  return (
    <>
      <NavbarWithLogin />

      <main className="pr-page">
        {/* ── Header ── */}
        <div className="pr-header">
          <span className="pr-eyebrow">Curated for you</span>
          <h1 className="pr-title">Plant Recommendations</h1>
          {name && (
            <div className="pr-location-badge">
              <i className="fa-solid fa-smog" />
              Based on air quality in <strong>{name}</strong>
            </div>
          )}
        </div>

        {/* ── Controls ── */}
        <div className="pr-controls">
          <div className="pr-lang-wrap">
            <i className="fa-solid fa-globe pr-lang-icon" />
            <select
              className="pr-lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down pr-lang-chevron" />
          </div>

          <div className="pr-count">
            {sorted.length} plant{sorted.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="pr-grid">
          {sorted.map((plant, i) => {
            const added = addedIds.has(plant.Id);
            return (
              <div
                className="pr-card"
                key={plant.Id}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Image */}
                <div className="pr-card-img-wrap">
                  <img src={plant.image} alt={t(plant.name)} className="pr-card-img" />
                  {/* Rating badge overlay */}
                  <div className="pr-card-rating-badge">
                    {renderRating(plant.Rating)}
                  </div>
                </div>

                {/* Body */}
                <div className="pr-card-body">
                  <h3 className="pr-card-name">{t(plant.name)}</h3>

                  <button
                    className={`pr-card-btn ${added ? "pr-card-btn--added" : ""}`}
                    onClick={() => addToWishlist(plant)}
                    disabled={added}
                  >
                    <i className={`fa-solid ${added ? "fa-check" : "fa-circle-plus"}`} />
                    {added ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom actions ── */}
        <div className="pr-actions">
          <button className="pr-btn pr-btn--outline" onClick={() => navigate("/nursery")}>
            <i className="fa-solid fa-store" />
            View Nurseries
          </button>
          <button className="pr-btn pr-btn--primary" onClick={() => navigate("/wishlist", { state: { wishlist } })}>
            <i className="fa-solid fa-heart" />
            Wishlist
            {wishlist.length > 0 && (
              <span className="pr-wishlist-count">{wishlist.length}</span>
            )}
          </button>
        </div>
      </main>

      <ToastContainer />
    </>
  );
};

export default PlantRecommendation;