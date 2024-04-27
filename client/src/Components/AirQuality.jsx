/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../Styles/AirQuality.css";
// import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarWithLogin from "./NavbarWithLogin";

const AirQuality = () => {
  const [name, setName] = useState();
  const [aqi, setAqi] = useState({});
  const [status, setStatus] = useState();
  const [pin, setPin] = useState();
  const navigate = useNavigate();
  let longitude, latitude;
  const loc = useLocation();
  const data = loc.state;
  console.log(data, "data");

  useEffect(() => {
    const fetch = async () => {
      if (!localStorage.getItem("user-app")) {
        navigate("/login");
      } else {
        const p = localStorage.getItem("user-app");
        setPin(p.pincode);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("user-app"));
    console.log("pin", p.pincode);
    const urlLocation = `https://api.openweathermap.org/geo/1.0/zip?zip=${
      p ? p.pincode : 755050
    },IN&appid=0223c39a61c5120938eb1733b306d0b1`;

    const api = async () => {
      const res = await fetch(urlLocation);
      const data = await res.json();
      setName(data.name);
      longitude = data.lon;
      latitude = data.lat;
    };

    console.log(latitude, longitude);
    api().then(() => {
      api1();
    });
  }, []);

  const api1 = async () => {
    if (latitude && longitude) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=0223c39a61c5120938eb1733b306d0b1`
      );
      const dat = await response.json();
      console.log("dat", dat);
      const aqiData = dat.list[0].components;
      if (
        (aqiData.so2 >= 0 && aqiData.so2 < 20) ||
        (aqiData.no2 >= 0 && aqiData.no2 < 40) ||
        (aqiData.o3 >= 0 && aqiData.o3 < 60) ||
        (aqiData.co >= 0 && aqiData.co < 4400)
      )
        setStatus("Good");
      if (
        (aqiData.so2 >= 20 && aqiData.so2 < 80) ||
        (aqiData.no2 >= 40 && aqiData.no2 < 70) ||
        (aqiData.o3 >= 60 && aqiData.o3 < 100) ||
        (aqiData.co >= 4400 && aqiData.co < 9400)
      )
        setStatus("Fair");
      if (
        (aqiData.so2 >= 80 && aqiData.so2 < 250) ||
        (aqiData.no2 >= 70 && aqiData.no2 < 150) ||
        (aqiData.o3 >= 100 && aqiData.o3 < 140) ||
        (aqiData.co >= 9400 && aqiData.co < 12400)
      )
        setStatus("Moderate");
      if (
        (aqiData.so2 >= 250 && aqiData.so2 < 350) ||
        (aqiData.no2 >= 150 && aqiData.no2 < 200) ||
        (aqiData.o3 >= 140 && aqiData.o3 < 180) ||
        (aqiData.co >= 12400 && aqiData.co < 15400)
      )
        setStatus("Poor");
      if (
        aqiData.so2 >= 350 ||
        aqiData.no2 >= 200 ||
        aqiData.o3 >= 180 ||
        aqiData.co >= 15400
      )
        setStatus("Very Poor");

      console.log(aqiData);
      setAqi(aqiData);
    }
  };
  const handlePollutionHistory = () => {
    const currentDate = new Date();
    const currentDateTime = currentDate.toLocaleString();

    const existingHistory = localStorage.getItem("pollution_history");
    let pollutionHistory = [];

    if (existingHistory) {
      pollutionHistory = JSON.parse(existingHistory);
    }

    const newPollutionData = {
      aqi: aqi,
      dateTime: currentDateTime,
    };
    pollutionHistory.push(newPollutionData);
    toast.success("Added to Pollution History", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    localStorage.setItem("pollution_history", JSON.stringify(pollutionHistory));
  };

  const handleshowpolutionhistort = () => {
    navigate("/pollution-history");
  };
  return (
    <>
      <NavbarWithLogin />
      <div className="container-aq">
        <h1 className="head">AQI</h1>
        <h3>{name}</h3>
        <div
          className="remark"
          style={{
            backgroundColor:
              status === "Good"
                ? "#65B741"
                : status === "Fair"
                ? "#FFB534"
                : status === "Moderate"
                ? "#EE7214"
                : status === "poor"
                ? "red"
                : "grey",
          }}
        >
          {status}
        </div>
        <div className="poll-level">
          <div className="row">
            <div className="pollutant">
              <span>Carbon Monoxide (CO)</span>
              <div className="fields">{aqi.co}</div>
            </div>
            <div className="pollutant">
              <span>Nitrogen Monoxide (NO)</span>
              <div className="fields">{aqi.no}</div>
            </div>
            <div className="pollutant">
              <span>Nitrogen Dioxide (NO2)</span>
              <div className="fields">{aqi.no2}</div>
            </div>
          </div>
          <div className="row">
            <div className="pollutant">
              <span>Ozone (O3)</span>
              <div className="fields">{aqi.o3}</div>
            </div>
            <div className="pollutant">
              <span>Sulphur Dioxide (SO2)</span>
              <div className="fields">{aqi.so2}</div>
            </div>
            <div className="pollutant">
              <span>Ammonia</span>
              <div className="fields">{aqi.nh3}</div>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Tooltip title="Recommendation" placement="top">
            <button
              className="btn-aqi"
              onClick={() =>  navigate(`/plantrecom?name=${encodeURIComponent(name)}`)}

            >
              <i className="fa-solid fa-seedling"></i>{" "}
            </button>
          </Tooltip>
          <Tooltip title="Add to Pollution History" placement="top">
            <button className="btn-aqi " onClick={handlePollutionHistory}>
              <i className="fa-solid fa-file-circle-plus"></i>
            </button>
          </Tooltip>
          <Tooltip title="Show Pollution History" placement="top">
            <button className="btn-aqi" onClick={handleshowpolutionhistort}>
              <i className="fa-solid fa-clock-rotate-left"></i>
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default AirQuality;
