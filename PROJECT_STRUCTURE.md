# Sanasa Bank Wilbagedara - MERN Stack Project Structure

```
sanasa-wilbagedara/
│
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json            # PWA manifest
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── logo.png
│   │   │   │   ├── hero-bg.jpg
│   │   │   │   └── gallery/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── WhatsAppButton.jsx
│   │   │   │   ├── NewsTicker.jsx
│   │   │   │   ├── SEOHead.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── QuickLinks.jsx
│   │   │   │   ├── LatestNews.jsx
│   │   │   │   └── Testimonials.jsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── SavingsCard.jsx
│   │   │   │   ├── LoanCard.jsx
│   │   │   │   └── LoanCalculator.jsx
│   │   │   │
│   │   │   ├── community/
│   │   │   │   ├── ActivityCard.jsx
│   │   │   │   ├── GalleryGrid.jsx
│   │   │   │   └── FacebookFeed.jsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   ├── MembershipInquiry.jsx
│   │   │   │   └── LoanApplication.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminSidebar.jsx
│   │   │       ├── DashboardStats.jsx
│   │   │       ├── InquiryTable.jsx
│   │   │       └── ActivityUploader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── SavingsPage.jsx
│   │   │   ├── LoansPage.jsx
│   │   │   ├── CommunityPage.jsx
│   │   │   ├── MemberServicesPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useLoanCalculator.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── seoConfig.js
│   │   │
│   │   ├── styles/
│   │   │   └── index.css              # Tailwind imports
│   │   │
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── serviceWorker.js           # PWA service worker
│   │
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env
│
├── server/                            # Node.js/Express Backend
│   ├── config/
│   │   ├── db.js                      # MongoDB connection
│   │   ├── cloudinary.js              # Image upload config
│   │   └── corsOptions.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── inquiryController.js
│   │   ├── activityController.js
│   │   └── loanApplicationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT verification
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   └── validateRequest.js
│   │
│   ├── models/
│   │   ├── User.js                    # Admin users
│   │   ├── Product.js                 # Savings & Loan products
│   │   ├── Inquiry.js                 # Member inquiries
│   │   ├── LoanApplication.js
│   │   ├── Activity.js                # Community activities/posts
│   │   └── Member.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── activityRoutes.js
│   │   └── loanRoutes.js
│   │
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── generateToken.js
│   │   └── validators.js
│   │
│   ├── uploads/                       # Temporary file uploads
│   │
│   ├── server.js                      # Entry point
│   ├── package.json
│   └── .env
│
├── docs/                              # Documentation
│   ├── DEPLOYMENT.md
│   ├── API_DOCUMENTATION.md
│   └── SEO_STRATEGY.md
│
├── .gitignore
├── docker-compose.yml                 # Optional: Docker setup
└── README.md
```

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB v6+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/sanasa-wilbagedara.git
cd sanasa-wilbagedara

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Run both in development
npm run dev
```

## Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sanasa_wilbagedara
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
```
