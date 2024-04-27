/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const Nursery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
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
      let nearestNursery = null;
      let minDistance = Infinity;

      data.forEach(async(nursery) => {
        const nurseryLocation = await fetchLocationFromPincode(nursery.pincodeNursery);
        console.log(nurseryLocation);
        const distance = calculateDistance(
          userLat,
          userLon,
          nurseryLocation.lat,
          nurseryLocation.lon
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestNursery = nursery;
        }
      });

      console.log("Nearest nursery:", nearestNursery);
      console.log("Distance:", minDistance.toFixed(2), "km");
    }
  }, [data, userLat, userLon]);

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
    <div>
      {data.map((nursery) => (
        <div key={nursery._id}>
          <h2>{nursery.nurseryname}</h2>
          <p>Address: {nursery.address}</p>
          {/* Render other nursery details */}
        </div>
      ))}
    </div>
  );
};

export default Nursery;
