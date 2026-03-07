/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../Styles/Nursery.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { useNavigate } from "react-router-dom";
import { nGetAllRoute } from "../utils/APIRoutes";
import { OPENWEATHER_API_KEY } from "../utils/config";

const Nursery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [distances, setDistances] = useState([]);

  const fetchLocationFromPincode = async (pincode) => {
    try {
      const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=${OPENWEATHER_API_KEY}`;
      const res = await fetch(urlLocation);
      if (!res.ok) {
        throw new Error("Failed to fetch location data for pincode");
      }
      const locationData = await res.json();
      return { lat: locationData.lat, lon: locationData.lon };
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(nGetAllRoute);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const p = JSON.parse(localStorage.getItem("user-app"));
        const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${
          p ? p.pincode : 755050
        },IN&appid=${OPENWEATHER_API_KEY}`;
        const res = await fetch(urlLocation);
        if (!res.ok) {
          throw new Error("Failed to fetch user location data");
        }
        const locationData = await res.json();

        setUserLat(locationData.lat);
        setUserLon(locationData.lon);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLat !== null && userLon !== null && data.length > 0) {
      Promise.all(
        data.map(async (nursery) => {
          const nurseryLocation = await fetchLocationFromPincode(
            nursery.pincodeNursery
          );
          if (!nurseryLocation) {
            return null;
          }
          const distance = calculateDistance(
            userLat,
            userLon,
            nurseryLocation.lat,
            nurseryLocation.lon
          );
          return { nursery, distance };
        })
      ).then((results) => {
        const validDistances = results
          .filter(Boolean)
          .sort((a, b) => a.distance - b.distance);
        setDistances(validDistances);
      });
    }
  }, [data, userLat, userLon]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavbarWithLogin />
      <div className="container-fluid">
        <div className="search-bar-container">
          <form action="" className="search-bar">
            <input
              type="search"
              name="search"
              pattern=".*\S.*"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" type="submit">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
        </div>

        <div className="row">
          {distances
            .filter(({ nursery }) => {
              return (
                nursery.nurseryname
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                nursery.address.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map(({ nursery, distance }) => (
              <div className="col-md-4 mt-4 " key={nursery._id}>
                <div className="card h-100 nursery-card">
                  <div className="card-body">
                    {distance <= 20 && (
                      <span className="badge ">
                        <i className="fa-solid fa-map-pin me-2"></i>Near
                      </span>
                    )}

                    <div className="n-img-container mx-auto">
                      <img className="rounded" src="../Images/dam.png" alt="plant" />
                    </div>
                    <div className="n-info text-center">
                      <h2 className="nursery-name">{nursery.nurseryname}</h2>
                      <div className="n-details">
                        <div className="n-detail">
                          <span>Address:</span> {nursery.address}
                        </div>
                        <div className="n-detail">
                          <span>Distance:</span> {distance.toFixed(2)} km
                        </div>
                        <div className="n-detail d-flex justify-content-evenly mt-3">
                          <button
                            className="btn btn-success text-light"
                            onClick={() => navigate(`/nurseryDetails/${nursery._id}`)}
                          >
                            Details
                          </button>
                          <button className="btn btn-success">
                            <a href={nursery.location} className="text-light">
                              Location
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Nursery;
