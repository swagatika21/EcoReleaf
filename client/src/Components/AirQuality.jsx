/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../Styles/AirQuality.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { OPENWEATHER_API_KEY } from "../utils/config";

const STATUS_META = {
  Good:      { color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   icon: "😊", desc: "Air quality is satisfactory." },
  Fair:      { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  icon: "🙂", desc: "Acceptable air quality." },
  Moderate:  { color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.3)",  icon: "😐", desc: "Sensitive groups may be affected." },
  Poor:      { color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   icon: "😷", desc: "Health effects possible for everyone." },
  "Very Poor":{ color: "#7f1d1d", bg: "rgba(127,29,29,0.15)",  border: "rgba(239,68,68,0.4)",   icon: "☠️", desc: "Serious health risk. Stay indoors." },
};

const POLLUTANTS = [
  { key: "co",  label: "Carbon Monoxide", symbol: "CO",  unit: "μg/m³" },
  { key: "no",  label: "Nitrogen Monoxide", symbol: "NO", unit: "μg/m³" },
  { key: "no2", label: "Nitrogen Dioxide", symbol: "NO₂", unit: "μg/m³" },
  { key: "o3",  label: "Ozone",            symbol: "O₃",  unit: "μg/m³" },
  { key: "so2", label: "Sulphur Dioxide",  symbol: "SO₂", unit: "μg/m³" },
  { key: "nh3", label: "Ammonia",          symbol: "NH₃", unit: "μg/m³" },
];

const AirQuality = () => {
  const [name, setName] = useState();
  const [aqi, setAqi] = useState({});
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  let longitude, latitude;
  const loc = useLocation();
  const data = loc.state;

  useEffect(() => {
    if (!localStorage.getItem("user-app")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("user-app"));
    const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${
      p ? p.pincode : 755050
    },IN&appid=${OPENWEATHER_API_KEY}`;

    const api = async () => {
      const res = await fetch(urlLocation);
      const data = await res.json();
      setName(data.name);
      longitude = data.lon;
      latitude = data.lat;
    };

    api().then(() => { api1(); });
  }, []);

  const api1 = async () => {
    if (latitude && longitude) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
      );
      const dat = await response.json();
      const aqiData = dat.list[0].components;

      if ((aqiData.so2 >= 0 && aqiData.so2 < 20) || (aqiData.no2 >= 0 && aqiData.no2 < 40) || (aqiData.o3 >= 0 && aqiData.o3 < 60) || (aqiData.co >= 0 && aqiData.co < 4400)) setStatus("Good");
      if ((aqiData.so2 >= 20 && aqiData.so2 < 80) || (aqiData.no2 >= 40 && aqiData.no2 < 70) || (aqiData.o3 >= 60 && aqiData.o3 < 100) || (aqiData.co >= 4400 && aqiData.co < 9400)) setStatus("Fair");
      if ((aqiData.so2 >= 80 && aqiData.so2 < 250) || (aqiData.no2 >= 70 && aqiData.no2 < 150) || (aqiData.o3 >= 100 && aqiData.o3 < 140) || (aqiData.co >= 9400 && aqiData.co < 12400)) setStatus("Moderate");
      if ((aqiData.so2 >= 250 && aqiData.so2 < 350) || (aqiData.no2 >= 150 && aqiData.no2 < 200) || (aqiData.o3 >= 140 && aqiData.o3 < 180) || (aqiData.co >= 12400 && aqiData.co < 15400)) setStatus("Poor");
      if (aqiData.so2 >= 350 || aqiData.no2 >= 200 || aqiData.o3 >= 180 || aqiData.co >= 15400) setStatus("Very Poor");

      setAqi(aqiData);
    }
  };

  const handlePollutionHistory = () => {
    const currentDateTime = new Date().toLocaleString();
    const existing = localStorage.getItem("pollution_history");
    const history = existing ? JSON.parse(existing) : [];
    history.push({ aqi, dateTime: currentDateTime });
    localStorage.setItem("pollution_history", JSON.stringify(history));
    toast.success("Added to Pollution History", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  const meta = STATUS_META[status] || {};

  return (
    <>
      <NavbarWithLogin />

      <main className="aq-page">
        {/* ── Header card ── */}
        <div className="aq-hero">
          <div className="aq-hero-top">
            <div className="aq-location">
              <span className="aq-location-icon">📍</span>
              <span className="aq-location-name">{name || "Loading..."}</span>
            </div>
            <span className="aq-live-badge">
              <span className="aq-live-dot" />
              Live
            </span>
          </div>

          <h1 className="aq-title">Air Quality Index</h1>

          {status && (
            <div className="aq-status-pill" style={{ background: meta.bg, borderColor: meta.border, color: meta.color }}>
              <span className="aq-status-icon">{meta.icon}</span>
              <span className="aq-status-label">{status}</span>
            </div>
          )}

          {status && (
            <p className="aq-status-desc" style={{ color: meta.color }}>{meta.desc}</p>
          )}
        </div>

        {/* ── Pollutant grid ── */}
        <section className="aq-grid">
          {POLLUTANTS.map(({ key, label, symbol, unit }) => (
            <div className="aq-card" key={key}>
              <div className="aq-card-symbol">{symbol}</div>
              <div className="aq-card-value">{aqi[key] ?? "—"}</div>
              <div className="aq-card-unit">{unit}</div>
              <div className="aq-card-label">{label}</div>
            </div>
          ))}
        </section>

        {/* ── Action buttons ── */}
        <div className="aq-actions">
          <Tooltip title="Plant Recommendations" placement="top">
            <button className="aq-btn" onClick={() => navigate(`/plantrecom?name=${encodeURIComponent(name)}`)}>
              <i className="fa-solid fa-seedling" />
              <span>Recommendations</span>
            </button>
          </Tooltip>
          <Tooltip title="Save to History" placement="top">
            <button className="aq-btn" onClick={handlePollutionHistory}>
              <i className="fa-solid fa-file-circle-plus" />
              <span>Save</span>
            </button>
          </Tooltip>
          <Tooltip title="View History" placement="top">
            <button className="aq-btn" onClick={() => navigate("/pollution-history")}>
              <i className="fa-solid fa-clock-rotate-left" />
              <span>History</span>
            </button>
          </Tooltip>
        </div>
      </main>
    </>
  );
};

export default AirQuality;