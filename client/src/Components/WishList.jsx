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
const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    console.log("Selected Language:", lang);
    setLanguage(lang);
    // i18n.changeLanguage(lang);
  };
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);
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
  // Function to handle deletion of wishlist items
  const handleDelete = (Id) => {
    console.log(Id);
    const updatedWishlist = wishlistItems.filter((item) => item.Id !== Id);
    setWishlistItems(updatedWishlist);

    try {
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error updating wishlist in local storage: ", error);
    }
  };

  const visitWishlist = () => {
    navigate("/plantrecom");
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

  // Check if wishlist is empty before rendering items
  if (wishlistItems.length === 0) {
    return (
      <div>
        <NavbarWithLogin />
        <div className="empty-wishlist">
          <h3>Your wishlist is empty</h3>
          {/* Display an image for empty wishlist */}
          <img src="../Images/heart.png" alt="Empty Wishlist" />
          <div className="d-block mx-auto">
         
            <button className="btn btn-outline-success" onClick={visitWishlist}>
              View Recommendation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavbarWithLogin />
      <div className="row">
        {wishlistItems.map((plant) => (
          <div key={plant.id} className="col-md-6">
             {/* <div className="">
            <select onChange={changeLanguage} className="form-select">
              <option value="EN">English</option>
              <option value="HI">HIndi</option>
              <option value="OD">Odia</option>
            </select>
          </div> */}
            <div className="wishlist-item w-50 m-2 mx-auto mt-3">
              <div className="wishlist-info  text-center">
                <div className="plant-image">
                  <img src={plant.image} alt="plant" className="plant-img" />
                </div>
                <div>
                  <p className="plant-name mt-2 mb-2">
                    <strong className="mt-2">{t(plant.name)}</strong><br></br>
                    <span className="rating">{renderRating(plant.Rating)}</span>
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-sun p-2"
                    ></i>
                    {t(plant.Sunlight)}
                  </p>
                  <p>
                    <i className="fa-solid fa-droplet p-2"></i>
                    {t(plant.water)}
                  </p>
                  <p>
                    <i className="fa-solid fa-ruler-vertical p-2"></i>
                    {t(plant.size)}
                  </p>
                </div>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(plant.Id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-outline-success mx-auto d-block "
        onClick={visitWishlist}
      >
        View Recommendation
      </button>
    </div>
  );
};

export default WishList;
