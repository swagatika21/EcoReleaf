// import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "../Styles/NurseryDetails.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { useParams } from "react-router-dom";

const NurseryDetails = () => {
  (function (w, d) {
    w.CollectId = "6563577c20465d1aa0f1b44b";
    var h = d.head || d.getElementsByTagName("head")[0];
    var s = d.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.async = true;
    s.setAttribute("src", "https://collectcdn.com/launcher.js");
    h.appendChild(s);
  })(window, document);

  const { nurseryId } = useParams();
  const [rating, setRating] = useState("");
  const [hasSubmittedRating, setHasSubmittedRating] = useState(false);
  const [nurseryDetails, setNurseryDetails] = useState(null);
  console.log(nurseryId);

  useEffect(() => {
    const fetchNurseryDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/authn/nursery/${nurseryId}`
        );
        const data = await res.json();
        console.log(data.nurseryname);
        setNurseryDetails(data);
      } catch (error) {
        console.error("Error fetching nursery details:", error);
        // Display an error message to the user here (optional)
      }
    };
  
    fetchNurseryDetails();
  }, [nurseryId]);
  const handleRatingSubmit = () => {
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

  return (
    <>
      <NavbarWithLogin />
      <div className="Nursery-det-container">
        <div className="nursery-img">
          <img src="../Images/dam.png" alt="plant" />
        </div>

        <div className="nursery-det">
          <h2>{nurseryDetails.nurseryname}</h2>
          <div className="n-details">
            <div className="ny-detail">
              <i className="fa-solid fa-address-card n-icon fa-2xl"></i>
              {/* <span>Address:</span> {nurseryDetails.address} */}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-square-phone n-icon fa-2xl"></i>
              {/* <span>Phone:</span> {nurseryDetails.phone} */}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-indian-rupee-sign n-icon fa-2xl"></i>
              <span>Price Range:</span> $300 - $500
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-leaf n-icon fa-2xl"></i>
              <span>Plant Speciality:</span> Herbal
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-star-half-stroke n-icon fa-2xl"></i>
              <span>Rating:</span> {rating}
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-truck-fast n-icon fa-2xl"></i>
              <span>Home Delivery:</span> Yes
            </div>

            <div className="ny-detail">
              <i className="fa-solid fa-location-dot n-icon fa-2xl"></i>
              <span>View Location:</span>
              <a href="https://maps.app.goo.gl/T9k5Xnio4dPidgVg6">
                https://maps.app.goo.gl/T9k5Xnio4dPidgVg6
              </a>
            </div>
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

      <div className="chat-cont">
        <button>
          <i className="fa-solid fa-comments fa-xl"></i> GET TO KNOW US
        </button>
      </div>
    </>
  );
};

export default NurseryDetails;
