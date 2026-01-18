import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function MemberServicesPage() {
  return (
    <>
      <SEOHead
        title="Member Services - Sanasa Bank Wilbagedara"
        description="Access member portal, submit inquiries, and apply for loans online."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-sanasa-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Member Services</h1>
            <p className="text-lg">All you need in one place</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Apply for a Loan */}
            <div className="card group hover:scale-105 hover:bg-sanasa-blue-50 transition-transform duration-300 border-t-4 border-sanasa-blue-700 rounded-2xl shadow-lg p-8 flex flex-col gap-3 md:gap-4 lg:gap-6 h-full">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sanasa-blue-100 text-sanasa-blue-700 text-2xl mr-3 shadow">💳</span>
                <h3 className="text-2xl font-bold">Apply for a Loan</h3>
              </div>
              <p className="text-gray-600 mb-6">Quick and easy loan application process with low interest rates.</p>
              <div className="mt-auto pt-2">
                <Link to="/loans" className="btn-secondary w-full flex items-center justify-center text-base font-semibold">Apply Now</Link>
              </div>
            </div>

            {/* Loan Calculator */}
            <div className="card group hover:scale-105 hover:bg-sanasa-blue-50 transition-transform duration-300 border-t-4 border-sanasa-blue-500 rounded-2xl shadow-lg p-8 flex flex-col gap-3 md:gap-4 lg:gap-6 h-full">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sanasa-blue-100 text-sanasa-blue-700 text-2xl mr-3 shadow">🧮</span>
                <h3 className="text-2xl font-bold">Loan Calculator</h3>
              </div>
              <p className="text-gray-600 mb-6">Calculate your EMI and understand your loan better.</p>
              <div className="mt-auto pt-2">
                <Link to="/loans" className="btn-secondary w-full flex items-center justify-center text-base font-semibold">Calculate EMI</Link>
              </div>
            </div>

            {/* Submit Inquiry */}
            <div className="card group hover:scale-105 hover:bg-sanasa-blue-50 transition-transform duration-300 border-t-4 border-sanasa-blue-400 rounded-2xl shadow-lg p-8 flex flex-col gap-3 md:gap-4 lg:gap-6 h-full">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sanasa-blue-100 text-sanasa-blue-700 text-2xl mr-3 shadow">✉️</span>
                <h3 className="text-2xl font-bold">Submit Inquiry</h3>
              </div>
              <p className="text-gray-600 mb-6">Have questions? Get in touch with our team.</p>
              <div className="mt-auto pt-2">
                <Link to="/contact" className="btn-secondary w-full flex items-center justify-center text-base font-semibold">Send Inquiry</Link>
              </div>
            </div>

            {/* Membership Info */}
            <div className="card group hover:scale-105 hover:bg-sanasa-blue-50 transition-transform duration-300 border-t-4 border-sanasa-blue-300 rounded-2xl shadow-lg p-8 flex flex-col gap-3 md:gap-4 lg:gap-6 h-full">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sanasa-blue-100 text-sanasa-blue-700 text-2xl mr-3 shadow">👥</span>
                <h3 className="text-2xl font-bold">Membership Info</h3>
              </div>
              <p className="text-gray-600 mb-6">Learn about membership benefits and requirements.</p>
              <div className="mt-auto pt-2">
                <button className="btn-secondary w-full flex items-center justify-center text-base font-semibold">Learn More</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'How do I apply for membership?', a: 'Visit our office or fill the online membership form.' },
                { q: 'What are the eligibility criteria for loans?', a: 'Be a member for at least 3 months with active savings.' },
                { q: 'How long does loan approval take?', a: 'Usually 3-5 business days depending on application completeness.' },
              ].map((item, i) => (
                <details key={i} className="border-b pb-4">
                  <summary className="font-semibold cursor-pointer text-sanasa-blue-700 hover:text-sanasa-blue-800">
                    {item.q}
                  </summary>
                  <p className="text-gray-600 mt-2">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
