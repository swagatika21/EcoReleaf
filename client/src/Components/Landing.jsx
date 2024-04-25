import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Landing.css";
import ProdDesc from "./ProdDesc";
import Footer from "./Footer";
import NavbarWithoutLogin from "./NavbarWithoutLogin";
import NavbarWithLogin from "./NavbarWithLogin";
import Context from "../context/Context";

function Landing() {
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {contextData.login ? <NavbarWithLogin /> : <NavbarWithoutLogin />}
      <section id="top">
        <div className="container-top">
          <img
            src="../Images/leafbg.png"
            className="cont-top"
            alt="Background"
          />
          <div className="text-overlay">
            <h3 className="quote-top">
              “To plant a garden is to believe in tomorrow.”
            </h3>

            <p>
              Join EcoReleaf as we try to combat pollution by making the earth a
              more green place.
            </p>
            {!contextData.login && (
              <div>
                <h2>JOIN US AS </h2>  
                <button
                  className="join-btn"
                  onClick={() => navigate("/signup")}
                >
                  CONTRIBUTOR
                </button>
                <button
                  className="join-btn"
                  onClick={() => navigate("/nurserysignup")}
                >
                  NURSERY OWNER
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProdDesc />
      <div className="feature-cont">
        <div className="feature">
          <div className="num">01</div>
          <p>
            Join our community by registering as a Nursery owner or contributor
            and become a part of the green revolution.
          </p>
          <button onClick={scrollToTop}>JOIN NOW</button>
        </div>
        <div className="feature">
          <div className="num">02</div>
          <p>
            Explore detailed Air Quality Index (AQI) information for plants if
            you are a contributor. If you are a nursery owner, showcase your
            profile to reach potential customers and promote your nursery.
          </p>
          <button onClick={scrollToTop}>JOIN NOW</button>
        </div>
        <div className="feature">
          <div className="num">03</div>
          <p>
            Receive personalized plant recommendations tailored to your
            preferences. Connect with nurseries to make a positive impact on the
            environment and contribute to a greener planet.
          </p>
          <button onClick={scrollToTop}>JOIN NOW</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Landing;
