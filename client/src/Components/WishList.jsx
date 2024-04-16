import NavbarWithLogin from "./NavbarWithLogin";
import { useEffect, useState } from "react";
import "../Styles/Wishlist.css";

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

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
  

  // Check if wishlist is empty before rendering items
  if (wishlistItems.length === 0) {
    return (
      <div>
        <NavbarWithLogin />
        <div className="empty-wishlist">
          <h3>Your wishlist is empty !</h3>
          {/* Display an image for empty wishlist */}
          <img src="../Images/heart.png" alt="Empty Wishlist" />
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
            <div className="wishlist-item">
              <div className="wishlist-info">
                 <div className="plant-image">
                    <img src={plant.image} alt="plant" />
                  </div>
                  <p><strong>Name: </strong>{plant.name}</p>
                  <p><strong><i className="fa-solid fa-sun
                  "></i> </strong>{plant.Sunlight}</p>
                  <p><strong> <i className="fa-solid fa-droplet"></i></strong>{plant.water}</p>
                <button className="delete-btn" onClick={() => handleDelete(plant.Id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
