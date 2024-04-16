/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarWithLogin from "./NavbarWithLogin";
import "../Styles/PlantRecomm.css";
import { FaLeaf } from "react-icons/fa";

const PlantRecommendation = () => {
  const { state } = useLocation();
  const nameFromAirQuality = state && state.name;
  const [jsonData, setJsonData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [selectedSuitability, setSelectedSuitability] = useState("");

  const handleSuitabilityChange = (event) => {
    setSelectedSuitability(event.target.value);
  };
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!localStorage.getItem("user-app")) {
        navigate("/login");
      } else {
        // No need to access or set selectBox data here
      }
    };
    fetchUserPreferences();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./Plants.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching or parsing data: ", error);
      }
    };

    fetchData();
  }, []);

  const addToWishlist = (plant) => {
    setWishlist([...wishlist, plant]);
    let storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    storedWishlist.push(plant);
    localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
    toast.success("Item added to wishlist!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  const handleViewWishlist = () => {
    navigate("/wishlist", { state: { wishlist } });
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaLeaf key={i} color="#65B741" />);
      } else {
        stars.push(<FaLeaf key={i} color="#e4e5e9" />);
      }
    }
    return stars;
  };

  return (
    <>
      <NavbarWithLogin />
      <div className="container-fluid h-100 centered-content">
        <h3 className="heading">Plant Recommendation</h3>
        <div className="recomm-info">
          <div className="info">Area: {nameFromAirQuality}</div>
          <div className="">
          <select
            className="form-select"
            value={selectedSuitability}
            onChange={handleSuitabilityChange}
          >
            <option value="">Select Suitability</option>
            <option value="Balcony">Balcony</option>
            <option value="Garden">Garden</option>
            <option value="Farm">Farm</option>
          </select>
        </div>
        </div>
        <div className="plant-container">
          {jsonData
            .slice()
            .sort((a, b) => b.Rating - a.Rating)
            .map((plant) => (
              <div key={plant.Id} className="plant-card">
                <div className="plant-info">
                  <div className="plant-image">
                    <img src={plant.image} alt="plant" />
                  </div>
                  <p>{plant.name}</p>
                  <p className="rating">{renderRating(plant.Rating)}</p>
                </div>
                <button
                  className="btn btn-outline-success mx-auto d-block mt-0 mb-2"
                  onClick={() => addToWishlist(plant)}
                >
                  <i className="fa-solid fa-circle-plus fa-xl"></i> Add to
                  Wishlist
                </button>
              </div>
            ))}
        </div>

        <div className="recomm-btn-cont">
          <button className="recomm-btn" onClick={() => navigate("/nursery")}>
            View Nursery
          </button>
          <button className="recomm-btn" onClick={handleViewWishlist}>
            Wishlist
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PlantRecommendation;
