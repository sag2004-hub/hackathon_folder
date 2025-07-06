import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import BroadcasterSignUp from "./auth/broadCasterSignUp";
import BroadCasterSignIn from "./auth/BroadCasterSignIn";
import SplashScreen from "./components/SplachScreen";
import Promo1 from "./components/promo1";
import Promo2 from "./components/promo2";
import Promo3 from "./components/promo3";
import UserSignIn from "./auth/UserSignIn";
import Dashboard from "./pages/viewers/Dashboard";
import News from "./pages/viewers/News";
import BroadcasterDashboard from "./pages/broadcasster/BroadCasterDashboad";
import BroadcasterUpload from "./components/BroadcasterUpload";
import Subscription from "./components/Subscription";
import UserSubscription from "./components/UserSubscription";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/broadcast-signup" element={<BroadcasterSignUp />} />
      <Route path="/broadcaster-signin" element={<BroadCasterSignIn />} />
      <Route path="/promo1" element={<Promo1 />} />
      <Route path="/promo2" element={<Promo2 />} />
      <Route path="/promo3" element={<Promo3 />} />
      <Route path="/user-signin" element={<UserSignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/news" element={<News/>} />
      <Route path="/broadcaster-dashboad" element={<BroadcasterDashboard/>} />
      <Route path="/upload" element={<BroadcasterUpload/>} />
      <Route path="/subsription" element={<Subscription/>}/>
      <Route path="/user-subscription" element={<UserSubscription/>}/>
      
    </Routes>
  );
}
