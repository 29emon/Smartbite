import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) return alert('Please enter delivery address.');

    try {
      setLoading(true);
      const orderItems = items.map(item => ({
        food: item._id,
        quantity: item.quantity
      }));

      await api.post('/orders', {
        items: orderItems,
        totalAmount: total,
        deliveryAddress: address
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(clearCart());
      navigate('/order-success');
    } catch (err) {
      alert('Failed to place order.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Delivery Address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        <p><strong>Total: ${total}</strong></p>
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
