import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderProcessing.css";

function OrderProcessing() {
  const [orderNo, setOrderNo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate random order number
    const randomOrder = Math.floor(Math.random() * 1000000);
    setOrderNo(randomOrder);
  }, []);

  return (
    <div className="processing-page">
      <div className="processing-card">
        <h1>⏳ Order is Being Processed...</h1>
        <p>Thank you for ordering with <strong>SmartBite</strong> 🍔</p>
        
        <div className="order-details">
          <p><strong>Order No:</strong> #{orderNo}</p>
          <p><strong>Delivery Location:</strong> 221B Baker Street, London</p>
        </div>

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

export default OrderProcessing;
