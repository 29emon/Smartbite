import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";   // New home page
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddFood from "./pages/AdminAddFood";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import FoodPicker from "./pages/FoodPicker";
import Tracker from "./pages/Tracker";
import Restaurant from "./pages/Restaurant"; // import
import TrackOrder from "./pages/TrackOrder";
import OrderProcessing from "./pages/OrderProcessing";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />   {/* NEW Home page */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/order-processing" element={<OrderProcessing />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add-food" element={<AdminRoute><AdminAddFood /></AdminRoute>} />
         <Route path="/foodpicker" element={<FoodPicker />} />
         <Route path="/tracker" element={<Tracker />} />
         <Route path="/restaurants" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
