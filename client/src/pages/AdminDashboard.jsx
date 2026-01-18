import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

// Placeholder admin pages
function AdminInquiries() {
  return <div className="p-6"><h3 className="text-2xl font-bold">Inquiries</h3><p className="text-gray-600 mt-4">Manage member inquiries here.</p></div>;
}

function AdminApplications() {
  return <div className="p-6"><h3 className="text-2xl font-bold">Loan Applications</h3><p className="text-gray-600 mt-4">Review and approve loan applications.</p></div>;
}

function AdminActivities() {
  return <div className="p-6"><h3 className="text-2xl font-bold">Activities</h3><p className="text-gray-600 mt-4">Manage community activities.</p></div>;
}

function AdminStats() {
  return <div className="p-6"><h3 className="text-2xl font-bold">Statistics</h3><p className="text-gray-600 mt-4">View dashboard statistics.</p></div>;
}

export default function AdminDashboard() {
  const location = useLocation();

  return (
    <>
      <SEOHead title="Admin Dashboard - Sanasa Bank" />

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-sanasa-green-700 text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
          <nav className="space-y-4">
            <Link
              to="/admin/dashboard/stats"
              className={`block p-3 rounded ${location.pathname.includes('stats') ? 'bg-sanasa-green-900' : 'hover:bg-sanasa-green-600'}`}
            >
              📊 Statistics
            </Link>
            <Link
              to="/admin/dashboard/inquiries"
              className={`block p-3 rounded ${location.pathname.includes('inquiries') ? 'bg-sanasa-green-900' : 'hover:bg-sanasa-green-600'}`}
            >
              💬 Inquiries
            </Link>
            <Link
              to="/admin/dashboard/applications"
              className={`block p-3 rounded ${location.pathname.includes('applications') ? 'bg-sanasa-green-900' : 'hover:bg-sanasa-green-600'}`}
            >
              📋 Applications
            </Link>
            <Link
              to="/admin/dashboard/activities"
              className={`block p-3 rounded ${location.pathname.includes('activities') ? 'bg-sanasa-green-900' : 'hover:bg-sanasa-green-600'}`}
            >
              🎯 Activities
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-sanasa-green-700">Dashboard</h1>
              <Link to="/" className="btn-secondary">
                Back to Site
              </Link>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<AdminStats />} />
              <Route path="/stats" element={<AdminStats />} />
              <Route path="/inquiries" element={<AdminInquiries />} />
              <Route path="/applications" element={<AdminApplications />} />
              <Route path="/activities" element={<AdminActivities />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
