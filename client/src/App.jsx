import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserProfile from "./Components/UserProfile";
import Landing from "./Components/Landing";
import UserDet from "./Components/UserDet";
import NurseryDet from "./Components/NurseryDet";
import AirQuality from "./Components/AirQuality";
import Login from "./Components/Login";
import PlantRecomm from "./Components/PlantRecomm";
import Nursery from "./Components/Nursery";
import NurseryProfile from "./Components/NurseryProfile";
import WishList from "./Components/WishList";
import NurseryDetails from "./Components/NurseryDetails";
import PollutionHistory from "./Components/PollutionHistory"; // Import the PollutionHistory component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signup" element={<UserDet />} />
        <Route  path="/login" element={<Login />} />
        <Route exact path="/nurserysignup" element={<NurseryDet />} />
        <Route exact path="/airquality" element={<AirQuality />} />
        <Route exact path="/plantrecom" element={<PlantRecomm />} />
        <Route exact path="/nursery" element={<Nursery />} />
        <Route exact path="/UserProfile" element={<UserProfile />} />
        <Route exact path="/nurseryprofile" element={<NurseryProfile />} />
        <Route exact path="/wishlist" element={<WishList />} />
        <Route
          exact
          path="/nurseryDetails/:nurseryId"
          element={<NurseryDetails />}
        />
        <Route exact path="/pollution-history" element={<PollutionHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
