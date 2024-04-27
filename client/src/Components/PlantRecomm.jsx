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

// console.log(dataHI)

const PlantRecommendation = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get("name");

  const [jsonData, setJsonData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    console.log("Selected Language:", lang);
    setLanguage(lang);
    // i18n.changeLanguage(lang);
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
        // const response = await fetch("./Plants.json");
        // const data = await response.json();
        language=="EN"?setJsonData(dataEN):language=="HI"?setJsonData(dataHI):setJsonData(dataOD)
      } catch (error) {
        console.error("Error fetching or parsing data: ", error);
      }
    };

    fetchData();
  }, [language]);

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
          <strong className="info">
            {name && `Plant recommendation for ${name}`}
          </strong>
          <div className="">
            <select onChange={changeLanguage} className="form-select">
              <option value="EN">English</option>
              <option value="HI">HIndi</option>
              <option value="OD">Odia</option>
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
                  {/* <p>{plant.name}</p> */}
                  <p>{t(plant.name)}</p>
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
