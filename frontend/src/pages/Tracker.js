import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "../styles/Tracker.css"; // ✅ Import CSS

// Fix leaflet marker issue
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to auto-zoom
function FitBounds({ position, destination }) {
  const map = useMap();
  useEffect(() => {
    if (position && destination) {
      const bounds = L.latLngBounds([position, destination]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [position, destination, map]);
  return null;
}

function Tracker() {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [query, setQuery] = useState("");

  // Get current GPS
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  // Search destination using Nominatim API
  const searchDestination = async () => {
    if (!query) return alert("Please enter your Order No");

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );

      if (res.data && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setDestination([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Destination not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching destination.");
    }
  };

  return (
    <div className="tracker-page">
      <h1>📍 GPS Tracker</h1>
      <button className="btn-primary" onClick={getLocation}>
        Get My Location
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Your Order No..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-primary" onClick={searchDestination}>
          Search
        </button>
      </div>

      {/* Map */}
      <div className="map-container">
        {position ? (
          <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>📍 You are here</Popup>
            </Marker>

            {destination && (
              <>
                <Marker position={destination}>
                  <Popup>🎯 Destination</Popup>
                </Marker>
                <Polyline positions={[position, destination]} color="red" />
                <FitBounds position={position} destination={destination} />
              </>
            )}
          </MapContainer>
        ) : (
          <p className="placeholder-text">Click "Search" to start tracking.</p>
        )}
      </div>

      {/* 🚚 Delivery Details */}
      <div className="card delivery-details">
        <h2>🚚 Delivery Details</h2>
        <p><strong>Order ID:</strong> #1234</p>
        <p><strong>Delivery Address:</strong>London_Eye,Tower _Bridge</p>
        <p><strong>Estimated Time:</strong> 20 mins</p>
        <p><strong>Delivery Person:</strong> Michael Jordan</p>
      </div>
      
      {/* 🗺 Google Maps Demo */}
        <div className="card google-map-demo">
  <h2>🗺 Order Tracking (Route)</h2>
  <iframe
    title="Google Maps Route"
    src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d19801.92930104013!2d-0.0974212!3d51.5054564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x487604b900f16ad7%3A0xdda83d3673d29944!2sLondon+Eye!3m2!1d51.503324!2d-0.119543!4m5!1s0x4876035105c4bc3d%3A0xe2d6bfffb1e4f8b2!2sTower+Bridge!3m2!1d51.5055!2d-0.075356!5e0!3m2!1sen!2suk!4v1673964533441!5m2!1sen!2suk"
    width="60%"
    height="300"
    style={{ border: 0, borderRadius: "16px" }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


      {/* 📞 Support Section */}
      <div className="card support-section">
        <h2>📞 Need Help?</h2>
        <p>If you face any issues with your delivery, please contact support.</p>
        <button className="btn-primary">Contact Support</button>
      </div>

      {/* Footer */}
      <footer className="tracker-footer">
        <p>© 2025 SmartBite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Tracker;
