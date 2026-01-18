import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page Not Found - Sanasa Bank" noindex />

      <div className="min-h-screen bg-gradient-to-r from-sanasa-blue-700 to-sanasa-blue-900 flex items-center justify-center px-4">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl mb-8">Page Not Found</p>
          <p className="text-lg mb-8">Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
