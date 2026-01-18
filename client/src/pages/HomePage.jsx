import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Sanasa Bank Wilbagedara - Low Interest Loans & Savings"
        description="Sanasa Bank Wilbagedara offers low-interest loans, savings accounts, and financial services for the community."
        canonical="https://sanasawilbagedara.lk"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sanasa-green-700 to-sanasa-green-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Welcome to Sanasa Bank Wilbagedara</h1>
              <p className="text-xl mb-6 text-sanasa-green-100">
                Your trusted thrift and credit cooperative serving the Wilbagedara community since 1995.
              </p>
              <div className="flex gap-4">
                <Link to="/loans" className="btn-primary">
                  Explore Loans
                </Link>
                <Link to="/savings" className="btn-secondary">
                  Savings Plans
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-sanasa-gold rounded-full mr-3 flex items-center justify-center text-sm">✓</span>
                    Low interest rates
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-sanasa-gold rounded-full mr-3 flex items-center justify-center text-sm">✓</span>
                    Fast approval process
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-sanasa-gold rounded-full mr-3 flex items-center justify-center text-sm">✓</span>
                    Flexible repayment terms
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-sanasa-gold rounded-full mr-3 flex items-center justify-center text-sm">✓</span>
                    Community support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'Savings', desc: 'Build your future with our flexible savings plans' },
              { icon: '💳', title: 'Loans', desc: 'Get affordable loans with low interest rates' },
              { icon: '🤝', title: 'Community', desc: 'Join our active community programs' },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sanasa-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join thousands of satisfied members who trust Sanasa Bank</p>
          <Link to="/member-services" className="btn-primary bg-white text-sanasa-green-700 hover:bg-gray-100">
            Become a Member Today
          </Link>
        </div>
      </section>
    </>
  );
}
