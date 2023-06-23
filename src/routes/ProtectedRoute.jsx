import { CLIENT_ROLE_ID } from 'constants/constants';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, rolesIds, isAuthenticated, userRoleId }) => {

  const hasRequiredRole = isAuthenticated ? rolesIds.includes(userRoleId) : false;
  if (!isAuthenticated && !hasRequiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
