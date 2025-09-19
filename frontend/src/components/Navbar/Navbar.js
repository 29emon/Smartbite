import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // ✅ admin check

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" className="nav-logo">SmartBite</NavLink>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-item">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurants" className="nav-item">
            Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className="nav-item">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/foodpicker" className="nav-item">
            Food Picker
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracker" className="nav-item">
            GPS Tracker
          </NavLink>
        </li>

        {role === 'admin' && (
          <li>
            <NavLink to="/admin/add-food" className="nav-item">
              Add Food
            </NavLink>
          </li>
        )}

        {!token ? (
          <>
            <li>
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </li>
        )}

        <li>
          <NavLink to="/cart" className="cart-icon">
            <FaShoppingCart size={22} />
            {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
