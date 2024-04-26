import { useEffect, useState } from "react";
import "../Styles/Nursery.css";
import NavbarWithLogin from "./NavbarWithLogin";
import { useNavigate } from "react-router-dom";

export default function Nursery() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5001/api/authn/ngetAll");
      const res1 = await res.json();
      setData(res1);
    };
    fetchData();
  }, []);

  const filteredData = data
    ? data.filter((d) => {
        return (
          d.nurseryname.toLowerCase().includes(search.toLowerCase()) ||
          d.address.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return (
    <>
      <NavbarWithLogin />
      <div className="container">
        {/* search bar */}
        <div>
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
        <div className="row">
          {filteredData &&
            filteredData.map((d, index) => (
              <div className="col-md-6 text-center" key={index}>
                <div className="nursery-desc">
                  <div className="n-img-container">
                    <img
                      src="../Images/dam.png"
                      alt="plant"
                      className="n-img"
                    />
                  </div>
                  <div className="n-info">
                    <h2>{d.nurseryname}</h2>
                    <div className="n-details">
                      <div className="n-detail">
                        <i className="fa-solid fa-address-card n-icon fa-2xl"></i>
                        <span>Address:</span> {d.address}
                      </div>
                      <div className="n-detail">
                        <i className="fa-solid fa-square-phone n-icon fa-2xl"></i>
                        <span>Phone:</span> {d.phone}
                      </div>
                      <div className="n-detail">
                        <i className="fa-solid fa-location-dot n-icon fa-2xl"></i>
                        <span className="text-light">
                          <a href={d.location}>View Location</a>
                        </span>
                      </div>
                      <div className="n-detail">
                        <button
                          onClick={() =>
                            navigate(`/nurseryDetails/${d._id}`)
                          }
                        >
                          VIEW DETAILS
                        </button>
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
}
