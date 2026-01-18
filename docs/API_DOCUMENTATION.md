# API Documentation - Sanasa Bank Wilbagedara
## Complete REST API Reference

---

## 📌 Base URL

```
Development: http://localhost:5000/api
Production: https://api.sanasawilbagedara.lk/api
```

---

## 🔐 Authentication

All admin endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📍 Endpoints

### Health Check

#### GET /health
Check if API is running

**Response:**
```json
{
  "success": true,
  "message": "Sanasa Wilbagedara API is running",
  "environment": "development",
  "timestamp": "2026-01-18T10:30:00Z"
}
```

---

### Authentication

#### POST /auth/login
Admin login

**Request:**
```json
{
  "email": "admin@sanasa.lk",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "admin@sanasa.lk",
    "name": "Admin Name",
    "role": "admin"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### GET /auth/me
Get current logged-in user (Requires Auth)

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "admin@sanasa.lk",
    "name": "Admin Name"
  }
}
```

#### POST /auth/logout
Logout user

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Products

#### GET /products
Get all products with optional filtering

**Query Parameters:**
- `type` (string): "savings" or "loan"
- `category` (string): Product category
- `limit` (number): Results per page
- `page` (number): Page number

**Example:**
```
GET /products?type=loan&category=personal&limit=10&page=1
```

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "product_id",
      "name": "Personal Loans",
      "slug": "personal-loans",
      "description": "Flexible personal loans...",
      "productType": "loan",
      "category": "personal",
      "interestRate": {
        "min": 14,
        "max": 18,
        "type": "reducing"
      },
      "loanAmount": {
        "min": 50000,
        "max": 500000
      },
      "tenure": {
        "min": 12,
        "max": 60
      },
      "features": [...],
      "isActive": true,
      "isFeatured": true
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10
}
```

#### GET /products/featured/list
Get featured products only

**Response:**
```json
{
  "success": true,
  "products": [...]
}
```

#### GET /products/:slug
Get product by slug

**Example:**
```
GET /products/personal-loans
```

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "product_id",
    "name": "Personal Loans",
    "slug": "personal-loans",
    "description": "...",
    "faqs": [
      {
        "question": "What is the interest rate?",
        "answer": "Interest rates range from 14% to 18%..."
      }
    ],
    "relatedProducts": [...]
  }
}
```

---

### Inquiries

#### POST /inquiries
Submit a contact form inquiry

**Request:**
```json
{
  "type": "membership",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+94771234567",
  "subject": "Membership Inquiry",
  "message": "I want to become a member...",
  "address": "123 "
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully. We will contact you soon.",
  "inquiryId": "inquiry_id"
}
```

#### GET /inquiries (Admin)
Get all inquiries

**Query Parameters:**
- `status` (string): "new", "in_progress", "responded", "resolved"
- `page` (number): Page number
- `limit` (number): Results per page

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "inquiries": [
    {
      "_id": "inquiry_id",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+94771234567",
      "type": "membership",
      "subject": "Membership Inquiry",
      "message": "I want to become a member...",
      "status": "new",
      "priority": "medium",
      "createdAt": "2026-01-18T10:00:00Z",
      "responses": []
    }
  ],
  "total": 45,
  "page": 1
}
```

#### GET /inquiries/:id (Admin)
Get specific inquiry details

**Response:**
```json
{
  "success": true,
  "inquiry": { ... }
}
```

#### PATCH /inquiries/:id (Admin)
Update inquiry status or assign

**Request:**
```json
{
  "status": "in_progress",
  "assignedTo": "staff_user_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry updated successfully"
}
```

---

### Loan Applications

#### POST /loans/apply
Submit loan application

**Request:**
```json
{
  "applicant": {
    "fullName": "John Doe",
    "nic": "123456789V",
    "dateOfBirth": "1990-01-15",
    "gender": "male",
    "occupation": "Farmer",
    "monthlyIncome": 45000
  },
  "contact": {
    "phone": "+94771234567",
    "whatsapp": "+94771234567",
    "email": "john@example.com",
    "address": {
      "line1": "123 ",
      "line2": "Wilbagedara",
      "city": "Wilbagedara",
      "district": "Bandarakoswaththa",
      "postalCode": "60000"
    }
  },
  "loan": {
    "product": "product_id",
    "amountRequested": 100000,
    "purpose": "Farm equipment",
    "purposeCategory": "agriculture",
    "tenureMonths": 24
  },
  "membership": {
    "isMember": true,
    "memberNumber": "SANASA-2026-001"
  },
  "collateral": {
    "type": "property",
    "estimatedValue": 500000
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Loan application submitted successfully",
  "applicationNumber": "WLB26011234",
  "nextSteps": [
    "Check your email for application confirmation",
    "We will contact you within 24 hours",
    "Prepare required documents for verification"
  ]
}
```

#### GET /loans/applications (Admin)
Get all loan applications

**Query Parameters:**
- `status` (string): "submitted", "under_review", "approved", "rejected", "disbursed"
- `page` (number): Page number
- `limit` (number): Results per page

**Response:**
```json
{
  "success": true,
  "applications": [
    {
      "_id": "app_id",
      "applicationNumber": "WLB26011234",
      "applicant": {
        "fullName": "John Doe",
        "nic": "123456789V"
      },
      "loan": {
        "amountRequested": 100000,
        "purpose": "Farm equipment"
      },
      "status": "under_review",
      "createdAt": "2026-01-18T10:00:00Z"
    }
  ],
  "total": 25,
  "page": 1
}
```

#### GET /loans/applications/:id (Admin)
Get application details

**Response:**
```json
{
  "success": true,
  "application": { ... }
}
```

#### PATCH /loans/applications/:id (Admin)
Update application status and approval

**Request:**
```json
{
  "status": "approved",
  "approvedAmount": 100000,
  "interestRate": 14,
  "tenure": 24
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application updated successfully"
}
```

#### POST /loans/calculate-emi
Calculate loan EMI (Public)

**Request:**
```json
{
  "principal": 100000,
  "rate": 14,
  "tenure": 24
}
```

**Response:**
```json
{
  "success": true,
  "emi": 4572,
  "totalPayable": 109728,
  "totalInterest": 9728
}
```

---

### Activities

#### GET /activities
Get published community activities

**Query Parameters:**
- `category` (string): "csr", "event", "news", etc.
- `page` (number): Page number
- `limit` (number): Results per page

**Response:**
```json
{
  "success": true,
  "activities": [
    {
      "_id": "activity_id",
      "title": "Community Tree Planting Day",
      "slug": "community-tree-planting-day",
      "excerpt": "We planted 200 trees in Wilbagedara...",
      "category": "csr",
      "eventDate": "2026-01-15",
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "caption": "Team planting trees",
          "isCover": true
        }
      ],
      "viewCount": 150,
      "publishedAt": "2026-01-16T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

#### GET /activities/latest
Get latest news and announcements

**Query Parameters:**
- `limit` (number): Number of results (default: 5)

**Response:**
```json
{
  "success": true,
  "activities": [...]
}
```

#### GET /activities/:slug
Get activity details

**Response:**
```json
{
  "success": true,
  "activity": {
    "_id": "activity_id",
    "title": "Community Tree Planting Day",
    "description": "Full description...",
    "images": [...],
    "videos": [...],
    "participants": [...],
    "tags": ["environment", "community"],
    "viewCount": 150
  }
}
```

#### POST /activities (Admin)
Create new activity

**Request:**
```json
{
  "title": "Community Tree Planting Day",
  "description": "We planted 200 trees...",
  "category": "csr",
  "eventDate": "2026-01-15",
  "location": {
    "name": "Wilbagedara School",
    "address": " Wilbagedara"
  },
  "tags": ["environment", "community"],
  "isFeatured": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activity created successfully",
  "activity": { ... }
}
```

#### PATCH /activities/:id (Admin)
Update activity

**Response:**
```json
{
  "success": true,
  "message": "Activity updated successfully"
}
```

---

## 🔄 Response Format

All responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🔍 Filtering & Pagination

### Query Parameters
```
GET /inquiries?status=new&page=1&limit=20&sort=-createdAt
```

### Supported Filters
- `status`: Filter by status
- `category`: Filter by category
- `type`: Filter by type
- `search`: Search in title/description
- `dateFrom`: Filter by start date
- `dateTo`: Filter by end date

### Sorting
```
?sort=-createdAt  # Descending
?sort=createdAt   # Ascending
```

---

## ⚙️ HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🔐 Rate Limiting

API implements rate limiting:
- **Standard**: 100 requests per 15 minutes per IP
- **Auth**: 10 login attempts per hour per IP
- **Header**: `X-RateLimit-Remaining` shows remaining requests

---

## 🧪 Testing with cURL

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Products
```bash
curl http://localhost:5000/api/products?type=loan&limit=5
```

### Submit Inquiry
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+94771234567",
    "subject": "Inquiry",
    "message": "Hello"
  }'
```

### Calculate EMI
```bash
curl -X POST http://localhost:5000/api/loans/calculate-emi \
  -H "Content-Type: application/json" \
  -d '{
    "principal": 100000,
    "rate": 14,
    "tenure": 24
  }'
```

---

## 📚 Resources

- [Postman Collection](./postman_collection.json) - Import for testing
- [Swagger UI](http://localhost:5000/docs) - Interactive API docs
- [GitHub Repository](https://github.com/your-repo) - Source code

---

**Document Version:** 1.0
**Last Updated:** January 2026
**For:** Sanasa Bank Wilbagedara Developers
