import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Layout from './components/common/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AcademicDetailsForm from './components/forms/AcademicDetailsForm.jsx';
import InternshipForm from './components/forms/InternshipForm.jsx';
import WorkExperienceForm from './components/forms/WorkExperienceForm.jsx';
import CertificatesForm from './components/forms/CertificatesForm.jsx';
import SkillsForm from './components/forms/SkillsForm.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import UserManagement from './components/admin/UserManagement.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Login handled by ProtectedRoute) */}
          
          {/* Protected User Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/academic" element={
            <ProtectedRoute>
              <Layout>
                <AcademicDetailsForm />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/internships" element={
            <ProtectedRoute>
              <Layout>
                <InternshipForm />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/work-experience" element={
            <ProtectedRoute>
              <Layout>
                <WorkExperienceForm />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/certificates" element={
            <ProtectedRoute>
              <Layout>
                <CertificatesForm />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/skills" element={
            <ProtectedRoute>
              <Layout>
                <SkillsForm />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/admin/data" element={
            <ProtectedRoute adminOnly={true}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
