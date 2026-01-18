# Quick Start Guide - Sanasa Bank Wilbagedara

## ✅ Current Status

✅ Project structure created
✅ Backend server running on port 5000
✅ MongoDB connected
✅ All route files created
✅ React frontend scaffolded

## 🚀 Next Steps

### Step 1: Install Dependencies

#### Server
```bash
cd server
npm install
```

#### Client
```bash
cd ../client
npm install
```

### Step 2: Setup MongoDB

If you don't have MongoDB installed:

**Windows:**
```bash
# Using Chocolatey
choco install mongodb-community

# Or download from https://www.mongodb.com/try/download/community
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
```

### Step 3: Configure Environment Variables

#### Server (.env)
Located in `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sanasa_wilbagedara
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Client (.env)
Located in `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Step 4: Start the Application

**Terminal 1 - Server:**
```bash
cd server
npm start
# or for auto-reload
npm run dev
```

Expected output:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏦 Sanasa Bank Wilbagedara API Server                   ║
║                                                           ║
║   Environment: development                            ║
║   Port: 5000                                             ║
║   URL: http://localhost:5000                             ║
║                                                           ║
║   API Health: http://localhost:5000/api/health           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

✅ MongoDB Connected: localhost
```

**Terminal 2 - Client:**
```bash
cd client
npm start
```

Expected output:
```
Compiled successfully!

You can now view sanasa-wilbagedara-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## 🧪 Test the Application

### 1. Check API Health
```bash
curl http://localhost:3000/api/health
```

### 2. Open in Browser
- Frontend: http://localhost:3000
- API: http://localhost:5000/api

### 3. Test Loan Calculator
- Navigate to Loans page
- Test the interactive EMI calculator

### 4. Submit a Test Inquiry
- Go to Contact page
- Fill and submit the form
- Check server logs for submission

## 📁 Project Structure Overview

```
sanasa-wilbagedara/
├── client/                    # React app
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Full page components
│   │   ├── context/          # Authentication context
│   │   ├── services/         # API calls
│   │   └── styles/           # Tailwind CSS
│   ├── package.json
│   └── .env
│
├── server/                    # Express backend
│   ├── routes/               # API endpoints
│   ├── models/               # MongoDB schemas
│   ├── middleware/           # Express middleware
│   ├── config/               # Configuration
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── DEPLOYMENT.md         # Production deployment
│   ├── SEO_STRATEGY.md       # SEO guidelines
│   └── API_DOCUMENTATION.md  # API reference
│
└── README.md
```

## 🛠️ Common Development Commands

### Server
```bash
npm start          # Production mode
npm run dev        # Development with auto-reload (uses nodemon)
npm test           # Run tests
npm run seed       # Seed database
```

### Client
```bash
npm start          # Development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from CRA (irreversible)
```

## 🔗 Useful Links

### Documentation
- [API Documentation](./docs/API_DOCUMENTATION.md) - Full API reference
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production setup
- [SEO Strategy](./docs/SEO_STRATEGY.md) - SEO optimization

### External Resources
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

## ❓ Troubleshooting

### "Cannot find module" errors
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection failed
```bash
# Check if MongoDB is running
mongosh  # or mongo for older versions

# On Windows, check services
Get-Service MongoDB
```

### Port already in use
```bash
# Find process using port 5000
lsof -i :5000      # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process and try again
```

### React dev server issues
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules .cache package-lock.json
npm install
npm start
```

## 📋 Checklist - Before Going Live

- [ ] All environment variables configured
- [ ] MongoDB backup configured
- [ ] Cloudinary account setup
- [ ] Gmail app password created
- [ ] JWT secret changed from default
- [ ] Admin user created in database
- [ ] All routes tested with Postman/cURL
- [ ] Contact form tested
- [ ] Loan calculator verified
- [ ] Responsive design tested on mobile
- [ ] SEO meta tags verified
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Error logging setup
- [ ] Database indexes created

## 🚀 Next Major Tasks

1. **Implement Controllers** - Business logic for each route
2. **Create User Model** - Admin authentication
3. **Setup Email Service** - Send notifications
4. **Add Product Seeding** - Populate initial data
5. **Implement Remaining Pages** - HomePage, AboutPage, etc.
6. **Admin Dashboard** - Full CRUD for content
7. **Cloudinary Integration** - Image uploads
8. **Deployment** - Follow DEPLOYMENT.md

## 💡 Tips

- Use MongoDB Compass for easy database management
- Test API with Postman before building frontend
- Use React DevTools browser extension for debugging
- Check browser console for client-side errors
- Check terminal for server-side errors
- Use `git init` and commit frequently

## 📞 Support

For issues or questions:
- Check the documentation files
- Review error messages carefully
- Check MongoDB connection status
- Verify environment variables
- Check network tab in browser DevTools

---

**Ready to code!** 🎉

Start with implementing the remaining pages and features. Good luck! 🚀
