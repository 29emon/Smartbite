import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TrackOrder.css";

const TrackOrder = () => {
  const [status, setStatus] = useState(0); // 0 = Placed, 1 = Preparing, 2 = Out, 3 = Delivered
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate order progress every 5 seconds
    if (status < 3) {
      const timer = setTimeout(() => setStatus(status + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const steps = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

  return (
    <div className="track-order">
      <div className="track-card">
        <h1>📍 Track Your Order</h1>
        <p>Order ID: #{Math.floor(Math.random() * 100000)}</p>

        <div className="progress-container">
          {steps.map((step, i) => (
            <div key={i} className={`step ${i <= status ? "active" : ""}`}>
              <div className="circle">{i < status ? "✔" : i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {status === 3 ? (
          <div className="delivered-msg">
            🎉 Your order has been delivered! Enjoy your meal 🍴
          </div>
        ) : (
          <p className="status-msg">
            Current Status: <strong>{steps[status]}</strong>
          </p>
        )}

        <button onClick={() => navigate("/")}>🏠 Back to Home</button>
      </div>
    </div>
  );
};

export default TrackOrder;
