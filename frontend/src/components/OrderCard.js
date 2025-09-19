import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <h4>Order #{order._id.slice(-6)}</h4>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.totalPrice}</p>
      <ul>
        {order.items.map(item => (
          <li key={item._id}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>
      <p className="order-date">{new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default OrderCard;
