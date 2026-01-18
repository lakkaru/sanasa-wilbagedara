import React from 'react';
import SEOHead from '../components/common/SEOHead';

export default function SavingsPage() {
  const savingsPlans = [
    {
      name: 'Lakdaru Account',
      target: 'Children',
      rate: '8-10%',
      min: 'Rs. 500',
      desc: 'Special savings account for children to learn financial discipline',
    },
    {
      name: 'Jawaya Account',
      target: 'Youth',
      rate: '10-12%',
      min: 'Rs. 1,000',
      desc: 'Designed for youth to build savings for future goals',
    },
    {
      name: 'Uththamavi Account',
      target: 'Women',
      rate: '12-14%',
      min: 'Rs. 500',
      desc: 'Empowering women with special interest rates and benefits',
    },
  ];

  return (
    <>
      <SEOHead
        title="Savings Accounts - Sanasa Bank Wilbagedara"
        description="Explore our flexible savings account options with competitive interest rates for all segments."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-sanasa-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Savings Plans</h1>
            <p className="text-lg">Build your financial future with our flexible savings accounts</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {savingsPlans.map((plan) => (
              <div key={plan.name} className="card hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-sanasa-blue-700 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">For: {plan.target}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-lg font-semibold">Interest Rate: <span className="text-sanasa-blue-700">{plan.rate}</span></p>
                  <p className="text-lg font-semibold">Minimum: <span className="text-sanasa-blue-700">{plan.min}</span></p>
                </div>
                <p className="text-gray-600 mb-6">{plan.desc}</p>
                <button className="btn-primary w-full">Learn More</button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Benefits of Saving with Us</h2>
            <ul className="space-y-3">
              {[
                'Competitive interest rates',
                'Flexible withdrawal terms',
                'Safe and secure deposits',
                'Online access to accounts',
                'Regular financial literacy training',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <span className="text-sanasa-blue-700 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
