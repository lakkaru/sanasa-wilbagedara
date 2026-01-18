import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SavingsPage = lazy(() => import('./pages/SavingsPage'));
const LoansPage = lazy(() => import('./pages/LoansPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const MemberServicesPage = lazy(() => import('./pages/MemberServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Sanasa Bank Wilbagedara - Main Application Component
 * 
 * A community-centric banking website featuring:
 * - Financial products (Savings & Loans)
 * - Community activities gallery
 * - Member services portal
 * - Admin dashboard for branch staff
 * 
 * SEO optimized for: "Sanasa Bank Wilbagedara", 
 * "Thrift and Credit Cooperative Sri Lanka",
 * "Low interest loans Wilbagedara"
 */
function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Global Navigation */}
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner fullScreen />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  
                  {/* Financial Products */}
                  <Route path="/savings" element={<SavingsPage />} />
                  <Route path="/loans" element={<LoansPage />} />
                  
                  {/* Community & Services */}
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/member-services" element={<MemberServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard/*" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            
            {/* Global Footer */}
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <WhatsAppButton 
              phoneNumber="+94771234567" 
              message="Hello! I'm interested in Sanasa Wilbagedara services."
            />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
