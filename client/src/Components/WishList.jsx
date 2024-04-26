import NavbarWithLogin from "./NavbarWithLogin";
import { useEffect, useState } from "react";
import "../Styles/Wishlist.css";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

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
            <div className="wishlist-item w-50 m-2 mx-auto mt-3">
              <div className="wishlist-info  text-center">
                <div className="plant-image">
                  <img src={plant.image} alt="plant" className="plant-img" />
                </div>
                <div>
                <p className="plant-name mt-4 mb-3">
                  <strong className="mt-2">{plant.name}</strong>
                </p>
                <p>
                  <i
                    className="fa-solid fa-sun p-2
                  "
                  ></i>
                  {plant.Sunlight}
                </p>
                <p>
                  <i className="fa-solid fa-droplet p-2"></i>
                  {plant.water}
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
      <button className="btn btn-outline-success mx-auto d-block " onClick={visitWishlist}>
            View Recommendation
          </button>
    </div>
  );
};

export default WishList;
