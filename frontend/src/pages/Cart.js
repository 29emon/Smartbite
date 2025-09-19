import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import '../styles/Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const items = useSelector(state => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    if (items.length === 0) return alert('Cart is empty');

    try {
      const payload = {
        items: items.map(item => ({
          food: item._id,
          quantity: item.quantity
        })),
        totalAmount: total,
        deliveryAddress: 'Test Address' // Replace with form input later
      };

      await api.post('/orders', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(clearCart());
      navigate('/order-success');
      navigate('/order-processing');

    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map(item => (
              <li className="cart-item" key={item._id}>
                <div>{item.name}</div>
                <div>${item.price.toFixed(2)}</div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      dispatch(updateQuantity({ id: item._id, quantity: parseInt(e.target.value) }))
                    }
                  />
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Total: ${total}</strong></p>
            <button onClick={handleCheckout} className="checkout-btn">Place Order</button>
            <button onClick={() => dispatch(clearCart())} className="clear-btn">Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
