# Sanasa Bank Wilbagedara - MERN Stack Website

A professional, community-centric website for Sanasa Bank Wilbagedara built with the MERN stack. Showcases local activities, financial products, and provides an online portal for area members.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, semantic HTML5
- **PWA Ready**: Progressive Web App capabilities
- **Loan Products**: Personal, Business (Divi Saviya), and Agricultural loans
- **Savings Accounts**: Multiple schemes (Kids, Youth, Women, Senior Citizen)
- **Community Activities**: Gallery and blog posts from Facebook integration
- **Member Services**: Online inquiries, loan applications, EMI calculator
- **Admin Dashboard**: Staff interface for managing inquiries and activities
- **Security**: JWT authentication, rate limiting, CORS protection

## 🛠️ Tech Stack

### Frontend
- React 18 with Hooks
- React Router v6
- Tailwind CSS
- Helmet for SEO
- Axios for API calls

### Backend
- Node.js 20+ LTS
- Express.js
- MongoDB 6+
- JWT for authentication
- Cloudinary for image uploads

### Deployment
- Ubuntu VPS (PM2)
- Nginx reverse proxy
- Cloudflare CDN & SSL
- MongoDB backup automation

## 📋 Prerequisites

- Node.js v18+
- MongoDB v6+
- npm or yarn
- Cloudinary account (for image uploads)
- Gmail account (for email notifications)

## ⚡ Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/your-repo/sanasa-wilbagedara.git
cd sanasa-wilbagedara
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Configure Server Environment
```bash
# Create .env file in server directory
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sanasa_wilbagedara
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

### 5. Install Client Dependencies
```bash
cd ../client
npm install
```

### 6. Configure Client Environment
```bash
# Create .env file in client directory
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

### 7. Start Client
```bash
npm start
```

Client will run on `http://localhost:3000`

## 📁 Project Structure

```
sanasa-wilbagedara/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── styles/        # Tailwind CSS
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API route handlers
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── middleware/        # Express middleware
│   ├── config/            # Configuration files
│   └── server.js          # Entry point
└── docs/                  # Documentation
    ├── DEPLOYMENT.md      # Deployment guide
    ├── SEO_STRATEGY.md    # SEO optimization
    └── API_DOCUMENTATION.md
```

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product details
- `GET /api/activities` - Get community activities
- `POST /api/inquiries` - Submit inquiry
- `POST /api/loans/apply` - Submit loan application
- `POST /api/loans/calculate-emi` - Calculate EMI

### Admin Endpoints (Requires JWT)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `GET /api/inquiries` - Get all inquiries
- `PATCH /api/inquiries/:id` - Update inquiry
- `POST /api/activities` - Create activity
- `PATCH /api/activities/:id` - Update activity

## 🔐 Environment Setup

### MongoDB Setup
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sanasa_wilbagedara
```

### Cloudinary Setup
1. Sign up at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add to `.env` file

### Gmail Setup
1. Enable 2FA on your Gmail account
2. Generate App Password
3. Use the App Password in `EMAIL_PASS`

## 📚 Documentation

- [Deployment Guide](./docs/DEPLOYMENT.md) - Complete Ubuntu VPS setup with PM2, Nginx, Cloudflare
- [SEO Strategy](./docs/SEO_STRATEGY.md) - SEO optimization for Loan Schemes page
- [API Documentation](./docs/API_DOCUMENTATION.md) - Detailed API reference

## 🚀 Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for step-by-step deployment instructions including:
- Ubuntu VPS setup
- Node.js & MongoDB installation
- PM2 process manager
- Nginx reverse proxy
- Cloudflare SSL & DDoS protection
- Database backup automation

## 👥 Admin Dashboard

Access admin panel at `/admin/login` with staff credentials.

**Features:**
- View member inquiries
- Manage loan applications
- Upload community activities
- Track application status
- Generate reports

## 🔒 Security Features

- ✅ HTTPS with Cloudflare SSL
- ✅ JWT authentication for admin
- ✅ Rate limiting (100 requests/15 min)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ MongoDB query sanitization
- ✅ DDoS protection (Cloudflare)
- ✅ WAF rules enabled

## 📱 Mobile Optimization

- Responsive design (mobile-first)
- Touch-friendly buttons (44x44px minimum)
- Fast loading (< 3 seconds)
- Readable font sizes
- WhatsApp integration

## 🎨 Branding

Primary Color: Green (#2D5A27)
Secondary Color: Gold (#D4A574)
Font: Inter + Noto Sans Sinhala (for Sinhala text)

## 📞 Contact

**Sanasa Bank Wilbagedara**
- Location: Main Street, Wilbagedara, Kurunegala, Sri Lanka
- Phone: +94-XX-XXXXXXX
- Email: info@sanasawilbagedara.lk
- Facebook: https://www.facebook.com/sanasa.wilbagedara/

## 📄 License

This project is proprietary to Sanasa Bank Wilbagedara.

## 🤝 Contributing

For contributions, please contact the development team.

---

**Last Updated:** January 2026
**Version:** 1.0.0
**Maintained By:** Sanasa Wilbagedara Development Team
