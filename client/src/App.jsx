
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserProfile from './Components/UserProfile'
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
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<UserDet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nurserysignup" element={<NurseryDet />} />
        <Route path="/airquality" element={<AirQuality />} />
        <Route path="/plantrecom" element={<PlantRecomm />} />
        <Route path="/nursery" element={<Nursery />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/nurseryprofile" element={<NurseryProfile />} />
        <Route path="/wishlist" element={ <WishList  />} />
        <Route path="/nurseryDetails/:nurseryId" element={<NurseryDetails />} />
        <Route path="/pollution-history" element={<PollutionHistory />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
