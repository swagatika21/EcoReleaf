/* eslint-disable no-unused-vars */
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
                <div className="nursery-desc d-flex">
                  <div className="n-img-container">
                    <img
                      src="../Images/dam.png"
                      alt="plant"
                    />
                  </div>
                  <div className="n-info">
                    <h2>{d.nurseryname}</h2>
                    <div className="n-details">
                      <div className="n-detail">
                        <span>Address:</span> {d.address}
                      </div>
      

                      <div className="n-detail d-flex">
                        <button
                          onClick={() =>
                            navigate(`/nurseryDetails/${d._id}`)
                          }
                        >
                          View Details
                        </button>
                        <span className="text-light">
                          <button className="ms-2">
                          <a href={d.location}>View Location</a>{" "}
                          </button>
                        </span>
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
