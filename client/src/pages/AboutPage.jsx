import React from 'react';
import SEOHead from '../components/common/SEOHead';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Sanasa Bank Wilbagedara"
        description="Learn about our history, mission, and commitment to serving the Wilbagedara community."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-sanasa-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg">Serving the Wilbagedara community with trust and integrity</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Sanasa Bank Wilbagedara was established in 1995 as a community-driven thrift and credit cooperative. For over 25 years, we have been committed to providing financial services that empower our members and strengthen our community.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, affordable, and reliable financial services that promote economic empowerment and community development in Wilbagedara and surrounding areas.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-3">
                {[
                  'Trust and Integrity',
                  'Community Focus',
                  'Financial Inclusion',
                  'Transparency',
                  'Member Satisfaction',
                ].map((value) => (
                  <li key={value} className="flex items-start">
                    <span className="text-sanasa-blue-700 font-bold mr-3">✓</span>
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sanasa-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Quick Facts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold text-sanasa-blue-700">25+</p>
                  <p className="text-gray-600">Years of Service</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-sanasa-blue-700">5000+</p>
                  <p className="text-gray-600">Active Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-sanasa-blue-700">50M+</p>
                  <p className="text-gray-600">Loans Disbursed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-sanasa-blue-700">100M+</p>
                  <p className="text-gray-600">Savings Mobilized</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
