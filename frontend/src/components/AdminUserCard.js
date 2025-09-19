import React from 'react';

const AdminUserCard = ({ user }) => (
  <div className="admin-user">
    <p><strong>{user.name}</strong> ({user.email}) — {user.role}</p>
  </div>
);

export default AdminUserCard;
