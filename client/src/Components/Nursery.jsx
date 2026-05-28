/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { nGetAllRoute } from "../utils/APIRoutes";
import { OPENWEATHER_API_KEY } from "../utils/config";
import "../Styles/Nursery.css";


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const fetchCoords = async (pincode) => {
  const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=${OPENWEATHER_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Location fetch failed");
  const d = await res.json();
  return { lat: d.lat, lon: d.lon };
};

// Loading skeleton card
const SkeletonCard = () => (
  <div className="nur-card nur-card--skeleton">
    <div className="nur-skeleton-img" />
    <div className="nur-card-body">
      <div className="nur-skeleton-line nur-skeleton-line--title" />
      <div className="nur-skeleton-line" />
      <div className="nur-skeleton-line nur-skeleton-line--short" />
      <div className="nur-skeleton-btns">
        <div className="nur-skeleton-btn" />
        <div className="nur-skeleton-btn" />
      </div>
    </div>
  </div>
);

const Nursery = () => {
  const [data, setData] = useState([]);
  const [distances, setDistances] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);   // fetching nurseries
  const [locating, setLocating] = useState(true);  // fetching distances
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");     // "all" | "nearby"
  const navigate = useNavigate();

  // 1. Fetch all nurseries
  useEffect(() => {
    const fetchNurseries = async () => {
      try {
        const res = await fetch(nGetAllRoute);
        if (!res.ok) throw new Error("Failed to fetch nurseries");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNurseries();
  }, []);

  // 2. Fetch user location from pincode
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const p = JSON.parse(localStorage.getItem("user-app"));
        const coords = await fetchCoords(p ? p.pincode : 755050);
        setUserCoords(coords);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserLocation();
  }, []);

  // 3. Once both ready, compute distances
  useEffect(() => {
    if (!userCoords || data.length === 0) return;

    const compute = async () => {
      setLocating(true);
      try {
        const results = await Promise.all(
          data.map(async (nursery) => {
            try {
              const coords = await fetchCoords(nursery.pincodeNursery);
              const distance = calculateDistance(
                userCoords.lat, userCoords.lon,
                coords.lat, coords.lon
              );
              return { nursery, distance };
            } catch {
              // If a single nursery's pincode fails, skip it gracefully
              return { nursery, distance: null };
            }
          })
        );
        const sorted = results
          .filter((r) => r.distance !== null)
          .sort((a, b) => a.distance - b.distance);
        setDistances(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLocating(false);
      }
    };

    compute();
  }, [data, userCoords]);

  // Filtered + searched list
  const filtered = useMemo(() => {
    return distances.filter(({ nursery, distance }) => {
      const matchesSearch =
        nursery.nurseryname.toLowerCase().includes(search.toLowerCase()) ||
        nursery.address.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || (filter === "nearby" && distance <= 20);
      return matchesSearch && matchesFilter;
    });
  }, [distances, search, filter]);

  const nearbyCount = distances.filter((d) => d.distance <= 20).length;

  /* ── Error state ── */
  if (error) {
    return (
      <>
        <Navbar />
        <main className="nur-page">
          <div className="nur-state-card">
            <div className="nur-state-icon">⚠️</div>
            <h3 className="nur-state-title">Something went wrong</h3>
            <p className="nur-state-desc">{error}</p>
            <button className="nur-btn nur-btn--primary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="nur-page">

        {/* ── Header ── */}
        <div className="nur-header">
          <span className="nur-eyebrow">Discover</span>
          <h1 className="nur-title">Nearby Nurseries</h1>
          {!locating && distances.length > 0 && (
            <p className="nur-subtitle">
              {distances.length} nurseri{distances.length !== 1 ? "es" : "y"} found
              {nearbyCount > 0 && (
                <> · <span className="nur-subtitle-near">{nearbyCount} within 20 km</span></>
              )}
            </p>
          )}
        </div>

        {/* ── Controls ── */}
        <div className="nur-controls">
          <div className="nur-search-wrap">
            <i className="fa-solid fa-search nur-search-icon" />
            <input
              className="nur-search"
              type="search"
              placeholder="Search by name or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="nur-filter-tabs">
            <button
              className={`nur-filter-tab ${filter === "all" ? "nur-filter-tab--active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`nur-filter-tab ${filter === "nearby" ? "nur-filter-tab--active" : ""}`}
              onClick={() => setFilter("nearby")}
            >
              <i className="fa-solid fa-map-pin" /> Nearby
              {nearbyCount > 0 && <span className="nur-filter-count">{nearbyCount}</span>}
            </button>
          </div>
        </div>

        {/* ── Loading skeletons ── */}
        {(loading || locating) && (
          <div className="nur-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty: no nurseries in DB at all ── */}
        {!loading && !locating && distances.length === 0 && (
          <div className="nur-state-card">
            <div className="nur-state-icon">🌱</div>
            <h3 className="nur-state-title">No nurseries yet</h3>
            <p className="nur-state-desc">
              There are no nurseries registered on EcoReleaf yet. Check back soon or invite a local nursery to join.
            </p>
          </div>
        )}

        {/* ── Empty: search/filter returned nothing ── */}
        {!loading && !locating && distances.length > 0 && filtered.length === 0 && (
          <div className="nur-state-card">
            <div className="nur-state-icon">🔍</div>
            <h3 className="nur-state-title">No results found</h3>
            <p className="nur-state-desc">
              {filter === "nearby"
                ? "No nurseries within 20 km match your search. Try expanding to all nurseries."
                : `No nurseries match "${search}". Try a different name or address.`}
            </p>
            <div className="nur-state-actions">
              {filter === "nearby" && (
                <button className="nur-btn nur-btn--outline" onClick={() => setFilter("all")}>
                  Show All Nurseries
                </button>
              )}
              {search && (
                <button className="nur-btn nur-btn--outline" onClick={() => setSearch("")}>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Nursery cards ── */}
        {!loading && !locating && filtered.length > 0 && (
          <div className="nur-grid">
            {filtered.map(({ nursery, distance }, i) => (
              <div className="nur-card" key={nursery._id} style={{ animationDelay: `${i * 0.05}s` }}>

                {/* Image */}
                <div className="nur-card-img-wrap">
                  <img src="../Images/dam.png" alt={nursery.nurseryname} className="nur-card-img" />
                  {distance <= 20 && (
                    <div className="nur-near-badge">
                      <i className="fa-solid fa-map-pin" /> Near you
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="nur-card-body">
                  <h3 className="nur-card-name">{nursery.nurseryname}</h3>

                  <div className="nur-card-meta">
                    <div className="nur-card-meta-item">
                      <span className="nur-card-meta-icon"><i className="fa-solid fa-location-dot" /></span>
                      <span className="nur-card-meta-text">{nursery.address}</span>
                    </div>
                    <div className="nur-card-meta-item">
                      <span className="nur-card-meta-icon"><i className="fa-solid fa-route" /></span>
                      <span className="nur-card-meta-text">
                        <strong style={{ color: distance <= 20 ? "#22c55e" : "inherit" }}>
                          {distance.toFixed(1)} km
                        </strong> away
                      </span>
                    </div>
                  </div>

                  <div className="nur-card-actions">
                    <button
                      className="nur-btn nur-btn--primary"
                      onClick={() => navigate(`/nurseryDetails/${nursery._id}`)}
                    >
                      <i className="fa-solid fa-circle-info" /> Details
                    </button>
                    <a
                      className="nur-btn nur-btn--outline"
                      href={nursery.location}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-solid fa-map" /> Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Nursery;