/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../Styles/Nursery.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { useNavigate } from "react-router-dom";
const Nursery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [distances, setDistances] = useState([]); // Add this line

  const fetchLocationFromPincode = async (pincode) => {
    try {
      const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=0223c39a61c5120938eb1733b306d0b1`;
      const res = await fetch(urlLocation);
      if (!res.ok) {
        throw new Error("Failed to fetch location data for pincode");
      }
      const locationData = await res.json();
      return { lat: locationData.lat, lon: locationData.lon };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const filteredData = data
    ? data.filter((d) => {
        return (
          d.nurseryname.toLowerCase().includes(search.toLowerCase()) ||
          d.address.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/authn/ngetAll");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const p = JSON.parse(localStorage.getItem("user-app"));
        console.log(p,"p");
        const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${
          p ? p.pincode : 755050
        },IN&appid=0223c39a61c5120938eb1733b306d0b1`;
        const res = await fetch(urlLocation);
        if (!res.ok) {
          throw new Error("Failed to fetch user location data");
        }
        const locationData = await res.json();
        console.log("User latitude:", locationData.lat);
        console.log("User longitude:", locationData.lon);

        setUserLat(locationData.lat);
        setUserLon(locationData.lon);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLat !== null && userLon !== null && data.length > 0) {
      Promise.all(data.map(async (nursery) => {
        const nurseryLocation = await fetchLocationFromPincode(nursery.pincodeNursery);
        const distance = calculateDistance(
          userLat,
          userLon,
          nurseryLocation.lat,
          nurseryLocation.lon
        );
        return { nursery, distance };
      })).then(distances => {
        distances.sort((a, b) => a.distance - b.distance);
        setDistances(distances);
      });
    }
  }, [data.length, userLat, userLon]);
  
  

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <NavbarWithLogin />
    <div className="container-fluid">
      {/* Search bar */}
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
      {/* Nursery cards */}
      <div className="row">
        {distances.map(({ nursery, distance }, index) => (
          <div className="col-md-4 mt-4 "  key={nursery._id}>
            <div className="card h-100 nursery-card">
              <div className="card-body">
                 {/* Mark nursery with minimum distance as "Near" */}
                 { distance <= 20 && (
    <span className="badge "><i className="fa-solid fa-map-pin me-2"></i>Near</span>
)}

                <div className="n-img-container mx-auto">
                  <img
                    className="rounded"
                    src="../Images/dam.png"
                    alt="plant"
                  />
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
                    {/* Add badges for near and far */}
                    <div className="n-detail d-flex justify-content-evenly mt-3">
                      <button
                        className="btn btn-success text-light"
                        onClick={() =>
                          navigate(`/nurseryDetails/${nursery._id}`)
                        }
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
