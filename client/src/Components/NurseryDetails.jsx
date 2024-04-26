/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../Styles/NurseryDetails.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { useParams } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

const NurseryDetails = () => {
  
  const { nurseryId } = useParams();
  const [rating, setRating] = useState("");
  const [hasSubmittedRating, setHasSubmittedRating] = useState(false);
  const [nurseryDetails, setNurseryDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRating = localStorage.getItem("rating");
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, []);

  useEffect(() => {
    const fetchNurseryDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/authn/nursery/${nurseryId}`
        );
        const data = await res.json();
        console.log(data);
        setNurseryDetails(data);
      } catch (error) {
        console.error("Error fetching nursery details:", error);
      }
    };
  
    fetchNurseryDetails();
  }, [nurseryId]);

 

  const handleRatingSubmit = () => {
      localStorage.setItem("rating", rating);
    setHasSubmittedRating(true);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "solid" : "regular";
    stars.push(
      <span
        key={i}
        className={`fa-star fa-${starClass}`}
        onMouseEnter={() => setRating(i)}
        onMouseLeave={() => setRating(rating)}
        onClick={() => handleStarClick(i)}
      />
    );
  }

  const handleStarClick = (rating) => {
    setRating(rating);
  };

  const Viewnursery = () => {
    navigate("/nursery"); 
  };



  return (
    <>
      <NavbarWithLogin />
      <div className="Nursery-det-container">
        <div className="nursery-img">
          <img src="../Images/dam.png" alt="plant" />
          <h4 className="text-center">{nurseryDetails && nurseryDetails.nurseryname}</h4>
        </div>

        <div className="nursery-det">
          <div className="n-details">
            <div className="ny-detail">
              <i className="fa-solid fa-address-card n-icon fa-xl"></i>
              <span>Address:</span> {nurseryDetails && nurseryDetails.address}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-square-phone n-icon fa-xl"></i>
              <span>Phone:</span> {nurseryDetails && nurseryDetails.phone}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-indian-rupee-sign n-icon fa-xl"></i>
              <span>Price Range:</span> {nurseryDetails && nurseryDetails.phone}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-leaf n-icon fa-xl"></i>
              <span>Plant Speciality:</span> {nurseryDetails &&  nurseryDetails.selectedCheckboxes.join(', ')}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-star-half-stroke n-icon fa-xl"></i>
              <span>Rating:</span> {rating}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-truck-fast n-icon fa-xl"></i>
              <span>Home Delivery:</span> {nurseryDetails && nurseryDetails.delivery}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-location-dot n-icon fa-xl"></i>
              <span>View Location:</span>
              <a href={nurseryDetails && nurseryDetails.location}>
                View
              </a>
            </div>
          </div>
          <div className="btn btn-outline-success mx-auto d-block w-50 mt-3" onClick={Viewnursery}>
            View More Nursery
          </div>
        </div>

        <div className="rating-cont">
          <h4>Rate Your Experience</h4>
          <div className="rating">{stars}</div>
          <button onClick={handleRatingSubmit}>Submit Rating</button>
          {hasSubmittedRating && (
            <div className="thank-you-message">Thank you for your review! </div>
          )}
        </div>
      </div>

    </>
  );
};

export default NurseryDetails;
