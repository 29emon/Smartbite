import React, { useState } from 'react';
import api from '../utils/axios';

const AdminOrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const token = localStorage.getItem('token');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await api.put(`/admin/orders/${order._id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order status updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="admin-order">
      <h4>Order #{order._id.slice(-5)}</h4>
      <p>User: {order.user.name}</p>
      <p>Total: ${order.totalPrice}</p>
      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      <label>Status:</label>
      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default AdminOrderCard;
