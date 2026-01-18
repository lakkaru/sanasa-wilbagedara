import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import LoanCalculator from '../components/products/LoanCalculator';

/**
 * Loans Page - Sanasa Bank Wilbagedara
 * SEO optimized page showcasing all loan schemes
 */
const LoansPage = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Sanasa Wilbagedara Loan Schemes",
    "description": "Low-interest personal, business, and agricultural loans for Wilbagedara community members",
    "provider": {
      "@type": "FinancialService",
      "name": "Sanasa Bank Wilbagedara",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Street, Wilbagedara",
        "addressLocality": "Wilbagedara",
        "addressRegion": "Kurunegala",
        "addressCountry": "LK"
      }
    },
    "interestRate": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 18,
      "unitText": "percent per annum"
    }
  };

  const loanProducts = [
    {
      id: 'personal',
      name: 'Personal Loans',
      nameSinhala: 'පුද්ගලික ණය',
      description: 'Flexible personal loans for your every need - education, medical expenses, home improvement, or family emergencies.',
      interestRate: '14% - 18%',
      amount: 'Rs. 50,000 - 500,000',
      tenure: '12 - 60 months',
      features: [
        'No hidden charges',
        'Quick 3-5 day processing',
        'Flexible repayment options',
        'Minimal documentation'
      ],
      icon: '👤',
      color: 'blue',
    },
    {
      id: 'business',
      name: 'Divi Saviya - Business Loans',
      nameSinhala: 'දිවි සවිය ව්‍යාපාර ණය',
      description: 'Empower your small business with affordable financing for working capital, equipment, and expansion.',
      interestRate: '12% - 16%',
      amount: 'Rs. 100,000 - 2,000,000',
      tenure: '12 - 48 months',
      features: [
        'Special rates for women entrepreneurs',
        'Flexible collateral options',
        'Business mentorship available',
        'Grace period available'
      ],
      icon: '🏪',
      color: 'purple',
    },
    {
      id: 'agricultural',
      name: 'Agricultural Loans',
      nameSinhala: 'කෘෂිකාර්මික ණය',
      description: 'Supporting Wilbagedara farmers with low-interest loans for cultivation, equipment, and post-harvest needs.',
      interestRate: '10% - 14%',
      amount: 'Rs. 25,000 - 1,000,000',
      tenure: '6 - 36 months',
      features: [
        'Lowest interest rates',
        'Seasonal repayment aligned with harvest',
        'Crop insurance guidance',
        'Quick disbursal for time-sensitive needs'
      ],
      icon: '🌾',
      color: 'green',
    },
  ];

  const eligibilityDocs = [
    'National Identity Card (NIC) copy',
    'Proof of income (salary slip or business documents)',
    'Utility bill for address verification',
    'Two passport-size photographs',
    'SANASA membership proof',
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Visit Our Branch',
      description: 'Come to Sanasa Wilbagedara with your documents for initial consultation.'
    },
    {
      step: 2,
      title: 'Submit Application',
      description: 'Fill out the loan application form and submit required documents.'
    },
    {
      step: 3,
      title: 'Verification',
      description: 'Our team verifies your documents and assesses eligibility.'
    },
    {
      step: 4,
      title: 'Approval & Disbursement',
      description: 'Upon approval, loan amount is disbursed to your account within 3-7 days.'
    },
  ];

  return (
    <>
      <SEOHead
        title="Low Interest Loans in Wilbagedara | Loan Schemes"
        description="Apply for low-interest loans at Sanasa Bank Wilbagedara. Personal loans, SME business loans (Divi Saviya), and agricultural loans for Kurunegala residents. Fast approval."
        keywords={[
          'Low interest loans Wilbagedara',
          'Sanasa loan',
          'Personal loan Kurunegala',
          'Agricultural loan Sri Lanka',
          'SME loan Sri Lanka',
          'Divi Saviya loan',
        ]}
        canonicalUrl="https://sanasawilbagedara.lk/loans"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Affordable Loan Schemes for Wilbagedara Community
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Supporting local dreams with low-interest financing. Personal, business, 
            and agricultural loans tailored for the Kurunegala community.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">10%</p>
              <p className="text-green-200 text-sm">Interest from</p>
            </div>
            <div className="border-l border-green-400 pl-8">
              <p className="text-4xl font-bold">Rs. 2M</p>
              <p className="text-green-200 text-sm">Loans up to</p>
            </div>
            <div className="border-l border-green-400 pl-8">
              <p className="text-4xl font-bold">5 Years</p>
              <p className="text-green-200 text-sm">Tenure up to</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Loan Products</h2>
          <p className="section-subtitle mx-auto">
            Choose the loan that fits your needs. All loans feature competitive interest 
            rates and flexible repayment options.
          </p>
        </div>

        <div className="space-y-8">
          {loanProducts.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              className={`product-card grid md:grid-cols-2 gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{product.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-500">{product.nameSinhala}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Interest</p>
                    <p className="text-lg font-bold text-green-700">{product.interestRate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Amount</p>
                    <p className="text-lg font-bold text-green-700">{product.amount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Tenure</p>
                    <p className="text-lg font-bold text-green-700">{product.tenure}</p>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn-primary inline-flex items-center">
                  Apply for {product.name.split(' ')[0]} Loan
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className={`bg-gradient-to-br from-${product.color}-50 to-${product.color}-100 rounded-xl p-8 flex items-center justify-center ${
                index % 2 === 1 ? 'md:order-1' : ''
              }`}>
                <div className="text-center">
                  <span className="text-8xl mb-4 block">{product.icon}</span>
                  <p className="text-2xl font-bold text-gray-800">{product.name}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="section-title">Calculate Your EMI</h2>
            <p className="section-subtitle mx-auto">
              Use our loan calculator to estimate your monthly installments
            </p>
          </div>
          <LoanCalculator />
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title mb-6">Eligibility Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Wilbagedara Area Resident</h4>
                  <p className="text-gray-600 text-sm">Must be a resident of Wilbagedara or nearby areas in Kurunegala District</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Age Requirement</h4>
                  <p className="text-gray-600 text-sm">Between 18 and 60 years of age</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">SANASA Membership</h4>
                  <p className="text-gray-600 text-sm">Must be a member (new members can apply for membership with loan)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Stable Income</h4>
                  <p className="text-gray-600 text-sm">Proof of regular income through employment or business</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-6">Required Documents</h2>
            <ul className="space-y-3">
              {eligibilityDocs.map((doc, i) => (
                <li key={i} className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              * Additional documents may be required based on loan type and amount.
            </p>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-green-800 text-white py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Apply</h2>
            <p className="text-green-200 max-w-2xl mx-auto">
              Getting a loan from Sanasa Wilbagedara is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {applicationSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-white text-green-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-green-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="bg-white text-green-800 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center">
              Start Your Application
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <details className="bg-white rounded-lg shadow-md p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              What is the minimum interest rate for Sanasa Wilbagedara loans?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600">
              The minimum interest rate starts from 10% per annum for agricultural loans. 
              Personal loans start from 14% and business loans from 12% per annum.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-md p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Do I need to be a SANASA member to get a loan?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600">
              Yes, SANASA membership is required. However, you can apply for membership 
              along with your loan application. The membership process is simple and 
              can be completed within a day.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-md p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              How long does loan approval take?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600">
              Loan approval typically takes 3-5 working days for personal loans after 
              submitting all required documents. Business and agricultural loans may 
              take 5-7 working days.
            </p>
          </details>

          <details className="bg-white rounded-lg shadow-md p-6 group">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Can I repay my loan early?
              <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600">
              Yes, early repayment is allowed without any prepayment penalty. You can 
              pay off your loan at any time, and interest will only be charged up to 
              the date of full repayment.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="section-container text-center">
          <h2 className="section-title mb-4">Ready to Apply?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Visit our branch in Wilbagedara or contact us via WhatsApp for a quick consultation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a
              href="https://wa.me/94771234567?text=Hello!%20I%20want%20to%20inquire%20about%20a%20loan."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoansPage;
