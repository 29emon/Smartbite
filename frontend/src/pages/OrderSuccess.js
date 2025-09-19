import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for ordering with <strong>SmartBite</strong> 🍔</p>
        <p>Your delicious food is being prepared and will arrive soon 🚚</p>

        <div className="actions">
          <button onClick={() => navigate("/track-order")} className="btn-primary">
            Track Order
          </button>
          <button onClick={() => navigate("/")} className="btn-secondary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
