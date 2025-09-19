import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // store this after login

  return token && userRole === 'admin'
    ? children
    : <Navigate to="/login" replace />;
};

export default AdminRoute;
