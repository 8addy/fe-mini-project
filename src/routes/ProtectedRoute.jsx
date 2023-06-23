import React from 'react';
import { Navigate } from 'react-router-dom';

const CLIENT_ROLE_ID = 1;
const ADMIN_ROLE_ID = 2;

const ProtectedRoute = ({ children, rolesIds, isAuthenticated }) => {
  const userRoleId = CLIENT_ROLE_ID;

  const hasRequiredRole = isAuthenticated ? rolesIds.includes(userRoleId) : false;
  if (!isAuthenticated && !hasRequiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
