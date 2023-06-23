import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navigation from '../layout/Navigation/Navigation';
import Login from '../pages/Login';
import { AuthContext } from 'context/AuthContext';
import Register from 'pages/Register';
import { Box, CircularProgress } from '@mui/material';
import ResetPassword from 'pages/ResetPassword';
import Home from 'pages/Home';
import Dashboard from 'pages/Admin/Dashboard/Dashboard';

const Cart = () => <div>Cart</div>;
const About = () => <div>About</div>;

const AppRoutes = () => {
  const { user, loadingUser } = useContext(AuthContext);
  const isAuth = !!user;

  return (
    <BrowserRouter>
        <Navigation isAuth={isAuth} roleId={user?.roleId} />
        {
          loadingUser ?
            (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Routes>
                  <Route exact path="/" element={<ProtectedRoute isAuthenticated={isAuth} rolesIds={[1, 2]}><Home /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuth} rolesIds={[1]}><Cart /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute isAuthenticated={isAuth} rolesIds={[2]}><About /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuth} rolesIds={[2]}><Dashboard /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Routes>
            )
        }
    </BrowserRouter>
  )
}

export default AppRoutes