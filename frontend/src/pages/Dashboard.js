import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        const orderRes = await api.get('/orders/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(orderRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Your Orders:</h3>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              <h4>Order #{order._id.slice(-6)}</h4>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.food.name} × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
