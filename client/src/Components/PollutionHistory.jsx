import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import NavbarWithLogin from "./NavbarWithLogin";
import {  useNavigate } from "react-router-dom";

const PollutionHistory = () => {
  const [pollutionHistory, setPollutionHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve pollution history from session storage
    const storedHistory = localStorage.getItem("pollution_history");
    if (storedHistory) {
      // Parse the JSON string to get the pollution history data
      const parsedHistory = JSON.parse(storedHistory);
      setPollutionHistory(parsedHistory);
    }
  }, []);

  useEffect(() => {
    if (pollutionHistory.length > 0) {
      renderChart();
    }
  }, [pollutionHistory]);

  const renderChart = () => {
    const labels = pollutionHistory.map((entry) => entry.dateTime);
    const coData = pollutionHistory.map((entry) => entry.aqi.co);
    const noData = pollutionHistory.map((entry) => entry.aqi.no);
    const no2Data = pollutionHistory.map((entry) => entry.aqi.no2);
    const o3Data = pollutionHistory.map((entry) => entry.aqi.o3);
    const so2Data = pollutionHistory.map((entry) => entry.aqi.so2);
    const nh3Data = pollutionHistory.map((entry) => entry.aqi.nh3);

    const ctx = document.getElementById("pollutionChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Carbon Monoxide (CO)",
            data: coData,
            borderColor: "red",
            fill: false,
          },
          {
            label: "Nitrogen Monoxide (NO)",
            data: noData,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Nitrogen Dioxide (NO2)",
            data: no2Data,
            borderColor: "green",
            fill: false,
          },
          {
            label: "Ozone (O3)",
            data: o3Data,
            borderColor: "orange",
            fill: false,
          },
          {
            label: "Sulphur Dioxide (SO2)",
            data: so2Data,
            borderColor: "purple",
            fill: false,
          },
          {
            label: "Ammonia (NH3)",
            data: nh3Data,
            borderColor: "brown",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date/Time",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "AQI",
            },
          },
        },
      },
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("pollution_history");
    setPollutionHistory([]);
  };

  const viewAQI = () => {
    navigate("/airquality"); 
   };

  return (
    <>
      <NavbarWithLogin />
      <div className="text-center mt-4">
        <h3>Pollution History</h3>
      </div>

      <div className="card p-2 m-3 w-75 mx-auto">
        {pollutionHistory.length > 0 ? (
          <>
            <canvas id="pollutionChart" style={{ maxHeight: "500px" }} />
            <div className=" mt-3 mb-2 mx-auto d-block">
              <button className="btn btn-outline-danger" onClick={clearHistory}>
              <i className="fa-solid fa-trash m-2"></i>
                Clear History
              </button>
              <button className=" ms-2 btn btn-outline-dark" onClick={viewAQI}>
              <i className="fa-solid fa-smog m-2"></i>
                View AQI Info
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-3">
            <p>No pollution history available.</p>
            <button className="btn btn-outline-dark" onClick={viewAQI}>
                View AQI Info
              </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PollutionHistory;
