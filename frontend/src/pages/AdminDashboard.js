import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import AdminOrderCard from '../components/AdminOrderCard';
import AdminUserCard from '../components/AdminUserCard';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orderRes = await api.get('/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(userRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>All Users</h3>
        {users.map(user => <AdminUserCard key={user._id} user={user} />)}
      </section>

      <section>
        <h3>All Orders</h3>
        {orders.map(order => <AdminOrderCard key={order._id} order={order} />)}
      </section>
    </div>
  );
};

export default AdminDashboard;
