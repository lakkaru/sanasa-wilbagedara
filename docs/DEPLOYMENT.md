# Deployment Guide - Sanasa Bank Wilbagedara
## Ubuntu VPS Deployment with PM2, Nginx & Cloudflare

---

## 📋 Prerequisites

- Ubuntu 22.04 LTS VPS (minimum 2GB RAM, 2 vCPU)
- Domain name (e.g., sanasawilbagedara.lk)
- Cloudflare account
- SSH access to the server
- FileZilla installed on local machine

---

## 🖥️ Step 1: Initial Server Setup

### 1.1 Connect to Your Server
```bash
ssh root@your_server_ip
```

### 1.2 Create a Non-Root User
```bash
# Create user
adduser sanasa

# Add to sudo group
usermod -aG sudo sanasa

# Switch to new user
su - sanasa
```

### 1.3 Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.4 Configure Firewall
```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🟢 Step 2: Install Node.js

### 2.1 Install Node.js 20.x LTS
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 2.2 Install Build Essentials
```bash
sudo apt install -y build-essential
```

---

## 🍃 Step 3: Install MongoDB

### 3.1 Import MongoDB GPG Key
```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

### 3.2 Create MongoDB Source List
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### 3.3 Install MongoDB
```bash
sudo apt update
sudo apt install -y mongodb-org
```

### 3.4 Start and Enable MongoDB
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

### 3.5 Secure MongoDB (Optional but Recommended)
```bash
# Enter MongoDB shell
mongosh

# Create admin user
use admin
db.createUser({
  user: "sanasaAdmin",
  pwd: "YourSecurePassword123!",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})

# Create database user
use sanasa_wilbagedara
db.createUser({
  user: "sanasaApp",
  pwd: "YourAppPassword123!",
  roles: [{ role: "readWrite", db: "sanasa_wilbagedara" }]
})

exit
```

Enable authentication in `/etc/mongod.conf`:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

---

## 📦 Step 4: Install PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
pm2 startup systemd

# Follow the output instructions to run the generated command
```

---

## 🌐 Step 5: Install and Configure Nginx

### 5.1 Install Nginx
```bash
sudo apt install -y nginx
```

### 5.2 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/sanasa
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name sanasawilbagedara.lk www.sanasawilbagedara.lk;

    # Redirect HTTP to HTTPS (handled by Cloudflare)
    # If using Cloudflare Flexible SSL, keep this as is
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|txt|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

### 5.3 Enable the Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/sanasa /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## 📂 Step 6: Deploy Application Files

### 6.1 Create Application Directory
```bash
sudo mkdir -p /var/www/sanasa
sudo chown -R sanasa:sanasa /var/www/sanasa
```

### 6.2 Transfer Files Using FileZilla

1. **Open FileZilla** on your local machine
2. **Connect to Server:**
   - Host: `sftp://your_server_ip`
   - Username: `sanasa`
   - Password: `your_password`
   - Port: `22`

3. **Upload Files:**
   - Navigate to `/var/www/sanasa` on remote
   - Upload entire project folder

### 6.3 Alternative: Using Git
```bash
cd /var/www/sanasa

# Clone your repository
git clone https://github.com/your-repo/sanasa-wilbagedara.git .
```

---

## ⚙️ Step 7: Configure Application

### 7.1 Create Server Environment File
```bash
cd /var/www/sanasa/server
nano .env
```

Add environment variables:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://sanasaApp:YourAppPassword123!@localhost:27017/sanasa_wilbagedara
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here_make_it_random
JWT_EXPIRE=30d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 7.2 Install Dependencies
```bash
# Install server dependencies
cd /var/www/sanasa/server
npm install --production

# Install client dependencies and build
cd /var/www/sanasa/client
npm install
npm run build
```

---

## 🚀 Step 8: Start Application with PM2

### 8.1 Create PM2 Ecosystem File
```bash
cd /var/www/sanasa
nano ecosystem.config.js
```

Add configuration:
```javascript
module.exports = {
  apps: [
    {
      name: 'sanasa-api',
      script: './server/server.js',
      cwd: '/var/www/sanasa',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/pm2/sanasa-error.log',
      out_file: '/var/log/pm2/sanasa-out.log',
      log_file: '/var/log/pm2/sanasa-combined.log',
      time: true,
      max_memory_restart: '500M',
      restart_delay: 4000,
      autorestart: true,
      watch: false
    }
  ]
};
```

### 8.2 Create Log Directory
```bash
sudo mkdir -p /var/log/pm2
sudo chown -R sanasa:sanasa /var/log/pm2
```

### 8.3 Start the Application
```bash
cd /var/www/sanasa
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Check status
pm2 status
pm2 logs sanasa-api
```

### 8.4 Useful PM2 Commands
```bash
# View all processes
pm2 list

# View logs
pm2 logs sanasa-api

# Restart application
pm2 restart sanasa-api

# Stop application
pm2 stop sanasa-api

# Monitor in real-time
pm2 monit

# View detailed info
pm2 show sanasa-api
```

---

## ☁️ Step 9: Cloudflare Configuration

### 9.1 Add Domain to Cloudflare

1. Log in to Cloudflare Dashboard
2. Click "Add a Site"
3. Enter your domain: `sanasawilbagedara.lk`
4. Select Free plan
5. Update nameservers at your domain registrar

### 9.2 Configure DNS Records

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| A | @ | your_server_ip | Proxied (Orange) |
| A | www | your_server_ip | Proxied (Orange) |
| CNAME | api | sanasawilbagedara.lk | Proxied (Orange) |

### 9.3 SSL/TLS Configuration

1. Go to **SSL/TLS** → **Overview**
2. Select encryption mode:
   - **Flexible**: If no SSL on server (easiest)
   - **Full**: If self-signed certificate on server
   - **Full (Strict)**: If valid SSL certificate on server

**Recommended for Production: Full (Strict)**

### 9.4 Enable SSL/TLS Settings

Navigate to **SSL/TLS** → **Edge Certificates**:
- ✅ Always Use HTTPS: **ON**
- ✅ Automatic HTTPS Rewrites: **ON**
- ✅ Minimum TLS Version: **TLS 1.2**

### 9.5 Security Settings

Navigate to **Security** → **Settings**:
- Security Level: **Medium** or **High**
- Challenge Passage: **30 minutes**
- Browser Integrity Check: **ON**

Navigate to **Security** → **WAF**:
- Enable Cloudflare Managed Ruleset
- Enable OWASP Core Ruleset

### 9.6 DDoS Protection

Navigate to **Security** → **DDoS**:
- DDoS Attack Protection: **ON** (enabled by default)
- Configure sensitivity as needed

### 9.7 Performance Optimization

Navigate to **Speed** → **Optimization**:
- ✅ Auto Minify: CSS, JavaScript, HTML
- ✅ Brotli Compression: **ON**
- ✅ Early Hints: **ON**
- ✅ Rocket Loader: **ON** (test thoroughly)

Navigate to **Caching** → **Configuration**:
- Caching Level: **Standard**
- Browser Cache TTL: **4 hours** or higher

### 9.8 Page Rules (Optional)

Create page rules for specific paths:

**Rule 1: Cache Static Assets**
- URL: `*sanasawilbagedara.lk/static/*`
- Setting: Cache Level → Cache Everything
- Edge Cache TTL: 1 month

**Rule 2: Bypass Cache for Admin**
- URL: `*sanasawilbagedara.lk/admin/*`
- Setting: Cache Level → Bypass

---

## 🔒 Step 10: Install SSL Certificate (For Full Strict Mode)

### Using Cloudflare Origin Certificate (Recommended)

1. Go to **SSL/TLS** → **Origin Server**
2. Click "Create Certificate"
3. Choose key type: RSA (2048)
4. Hostnames: `sanasawilbagedara.lk, *.sanasawilbagedara.lk`
5. Validity: 15 years
6. Click "Create"
7. Copy the certificate and private key

### Install on Server
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/cloudflare

# Create certificate file
sudo nano /etc/ssl/cloudflare/cert.pem
# Paste the certificate content

# Create private key file
sudo nano /etc/ssl/cloudflare/key.pem
# Paste the private key content

# Set permissions
sudo chmod 644 /etc/ssl/cloudflare/cert.pem
sudo chmod 600 /etc/ssl/cloudflare/key.pem
```

### Update Nginx for HTTPS
```bash
sudo nano /etc/nginx/sites-available/sanasa
```

```nginx
server {
    listen 80;
    server_name sanasawilbagedara.lk www.sanasawilbagedara.lk;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sanasawilbagedara.lk www.sanasawilbagedara.lk;

    ssl_certificate /etc/ssl/cloudflare/cert.pem;
    ssl_certificate_key /etc/ssl/cloudflare/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔄 Step 11: Deployment Updates

### Automated Deployment Script
Create `/var/www/sanasa/deploy.sh`:
```bash
#!/bin/bash

echo "🚀 Starting deployment..."

cd /var/www/sanasa

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install --production

# Build React app
echo "🔨 Building React app..."
cd ../client
npm install
npm run build

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart sanasa-api

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x /var/www/sanasa/deploy.sh
```

Run deployment:
```bash
./deploy.sh
```

---

## 📊 Step 12: Monitoring & Maintenance

### 12.1 Setup Log Rotation
```bash
sudo nano /etc/logrotate.d/pm2-sanasa
```

```
/var/log/pm2/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 sanasa sanasa
}
```

### 12.2 Monitor Server Resources
```bash
# Install htop
sudo apt install htop

# Run htop
htop
```

### 12.3 Database Backup Script
Create `/home/sanasa/backup-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/home/sanasa/backups"
DATE=$(date +%Y%m%d_%H%M%S)
MONGO_URI="mongodb://sanasaApp:YourAppPassword123!@localhost:27017/sanasa_wilbagedara"

mkdir -p $BACKUP_DIR
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/backup_$DATE"

# Keep only last 7 days of backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: backup_$DATE"
```

Add to crontab:
```bash
crontab -e
# Add line:
0 2 * * * /home/sanasa/backup-db.sh >> /var/log/mongodb-backup.log 2>&1
```

---

## ✅ Post-Deployment Checklist

- [ ] Application accessible via domain
- [ ] HTTPS working correctly
- [ ] All pages loading properly
- [ ] Contact forms submitting successfully
- [ ] Admin login working
- [ ] WhatsApp button functional
- [ ] Images loading from Cloudinary
- [ ] MongoDB connection stable
- [ ] PM2 processes running
- [ ] Cloudflare caching working
- [ ] SSL certificate valid
- [ ] Backups configured
- [ ] Monitoring in place

---

## 🆘 Troubleshooting

### Application Not Loading
```bash
# Check PM2 status
pm2 status
pm2 logs sanasa-api --lines 50

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
```

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### 502 Bad Gateway
```bash
# Usually means Node.js app is not running
pm2 restart sanasa-api

# Or check if port 5000 is in use
sudo lsof -i :5000
```

### Clear Cloudflare Cache
1. Go to Cloudflare Dashboard
2. **Caching** → **Configuration**
3. Click "Purge Everything"

---

*Document Version: 1.0*
*Last Updated: January 2026*
*For: Sanasa Bank Wilbagedara Technical Team*
