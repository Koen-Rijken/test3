import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProductsPage from '../pages/ProductsPage';
import InvoicesPage from '../pages/InvoicesPage';
import ProfilePage from '../pages/ProfilePage';
import UsersPage from '../pages/UsersPage';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/invoices" element={<Layout><InvoicesPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
      </Route>
      
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/users" element={<Layout><UsersPage /></Layout>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;