import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';

// Main site navigation with dropdown for products and responsive mobile menu
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
      name: 'Products',
      href: '#',
      children: [
        { name: 'Savings Accounts', href: '/savings' },
        { name: 'Loan Schemes', href: '/loans' },
      ],
    },
    { name: 'Community', href: '/community' },
    { name: 'Member Services', href: '/member-services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-sanasa-blue-800 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📍 Wilbagedara, Bandarakoswaththa, Sri Lanka</span>
            <span>|</span>
            <a href="tel:+94771234567" className="flex items-center hover:text-sanasa-blue-200">
              <PhoneIcon className="h-4 w-4 mr-1" />
              +94 37 229 3845
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/sanasa.wilbagedara/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sanasa-blue-200"
            >
              Facebook
            </a>
            <Link to="/admin/login" className="hover:text-sanasa-blue-200">
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sanasa-blue-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-sanasa-blue-800">Sanasa Wilbagedara</h1>
              <p className="text-xs text-gray-500">සණස විල්බාගෙදර</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name} className="relative group">
                  <button className="nav-link px-3 py-2 flex items-center">
                    {item.name}
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-sanasa-blue-50 hover:text-sanasa-blue-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link px-3 py-2 ${
                    isActive(item.href) ? 'text-sanasa-blue-700 font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/loans" className="btn-primary">
              Apply for Loan
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="space-y-1">
              {navigation.map((item) => (
                item.children ? (
                  <div key={item.name}>
                    <div className="px-3 py-2 text-gray-500 font-medium text-sm uppercase">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-2 text-gray-700 hover:bg-sanasa-blue-50 hover:text-sanasa-blue-700"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md ${
                      isActive(item.href)
                        ? 'bg-sanasa-blue-50 text-sanasa-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
            <div className="mt-4 px-3">
              <Link
                to="/loans"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center block"
              >
                Apply for Loan
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
