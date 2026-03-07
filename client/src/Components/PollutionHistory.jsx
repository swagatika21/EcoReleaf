import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import NavbarWithLogin from "./NavbarWithLogin";
import { useNavigate } from "react-router-dom";
import "../Styles/PollutionHistory.css";

const DATASETS_META = [
  { key: "co",  label: "Carbon Monoxide",   symbol: "CO",  color: "#ef4444" },
  { key: "no",  label: "Nitrogen Monoxide", symbol: "NO",  color: "#3b82f6" },
  { key: "no2", label: "Nitrogen Dioxide",  symbol: "NO₂", color: "#f59e0b" },
  { key: "o3",  label: "Ozone",             symbol: "O₃",  color: "#22c55e" },
  { key: "so2", label: "Sulphur Dioxide",   symbol: "SO₂", color: "#a855f7" },
  { key: "nh3", label: "Ammonia",           symbol: "NH₃", color: "#06b6d4" },
];

const PollutionHistory = () => {
  const [pollutionHistory, setPollutionHistory] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pollution_history");
    if (stored) setPollutionHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (pollutionHistory.length > 0 && chartRef.current) {
      // Destroy previous instance if exists
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();

      const labels = pollutionHistory.map((e) => e.dateTime);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: DATASETS_META.map(({ key, label, color }) => ({
            label,
            data: pollutionHistory.map((e) => e.aqi[key]),
            borderColor: color,
            backgroundColor: color + "18",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: color,
            tension: 0.4,
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: { family: "'DM Sans', sans-serif", size: 12 },
                color: "#557360",
                usePointStyle: true,
                pointStyleWidth: 8,
                padding: 20,
              },
            },
            tooltip: {
              backgroundColor: "#0f1f14",
              titleColor: "#f0fdf4",
              bodyColor: "#a4be7b",
              borderColor: "rgba(164,190,123,0.2)",
              borderWidth: 1,
              padding: 12,
              titleFont: { family: "'DM Sans', sans-serif", size: 12 },
              bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(164,190,123,0.08)" },
              ticks: {
                color: "#557360",
                font: { family: "'DM Sans', sans-serif", size: 11 },
                maxRotation: 30,
              },
              title: {
                display: true,
                text: "Date / Time",
                color: "#557360",
                font: { family: "'DM Sans', sans-serif", size: 12 },
              },
            },
            y: {
              grid: { color: "rgba(164,190,123,0.08)" },
              ticks: {
                color: "#557360",
                font: { family: "'DM Sans', sans-serif", size: 11 },
              },
              title: {
                display: true,
                text: "Concentration (μg/m³)",
                color: "#557360",
                font: { family: "'DM Sans', sans-serif", size: 12 },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [pollutionHistory]);

  const clearHistory = () => {
    localStorage.removeItem("pollution_history");
    setPollutionHistory([]);
  };

  // Latest snapshot for summary row
  const latest = pollutionHistory[pollutionHistory.length - 1]?.aqi;

  return (
    <>
      <NavbarWithLogin />

      <main className="ph-page">
        {/* ── Page header ── */}
        <div className="ph-header">
          <span className="ph-eyebrow">Your Records</span>
          <h1 className="ph-title">Pollution History</h1>
          {pollutionHistory.length > 0 && (
            <p className="ph-subtitle">
              {pollutionHistory.length} snapshot{pollutionHistory.length !== 1 ? "s" : ""} saved · Last recorded{" "}
              <strong>{pollutionHistory[pollutionHistory.length - 1].dateTime}</strong>
            </p>
          )}
        </div>

        {pollutionHistory.length > 0 ? (
          <>
            {/* ── Latest snapshot pills ── */}
            <div className="ph-snapshot">
              {DATASETS_META.map(({ key, symbol, color }) => (
                <div className="ph-snap-pill" key={key} style={{ borderColor: color + "40" }}>
                  <span className="ph-snap-symbol" style={{ color }}>{symbol}</span>
                  <span className="ph-snap-value">{latest?.[key] ?? "—"}</span>
                  <span className="ph-snap-unit">μg/m³</span>
                </div>
              ))}
            </div>

            {/* ── Chart card ── */}
            <div className="ph-chart-card">
              <div className="ph-chart-header">
                <span className="ph-chart-title">Pollutant Trends</span>
                <span className="ph-live-badge">
                  <span className="ph-live-dot" />
                  Live data
                </span>
              </div>
              <div className="ph-chart-wrap">
                <canvas ref={chartRef} />
              </div>
            </div>

            {/* ── Actions ── */}
            <div className="ph-actions">
              <button className="ph-btn ph-btn--ghost-danger" onClick={clearHistory}>
                <i className="fa-solid fa-trash" />
                Clear History
              </button>
              <button className="ph-btn ph-btn--primary" onClick={() => navigate("/airquality")}>
                <i className="fa-solid fa-smog" />
                View AQI Info
              </button>
            </div>
          </>
        ) : (
          /* ── Empty state ── */
          <div className="ph-empty">
            <div className="ph-empty-icon">🌿</div>
            <h3 className="ph-empty-title">No history yet</h3>
            <p className="ph-empty-desc">
              Save an AQI snapshot from the Air Quality page and it will appear here.
            </p>
            <button className="ph-btn ph-btn--primary" onClick={() => navigate("/airquality")}>
              <i className="fa-solid fa-smog" />
              Check Air Quality
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default PollutionHistory;