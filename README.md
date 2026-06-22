# PropSpace — Property Listing App

A full-stack real-time web application where users can list, view, update, and delete properties for rent or sale.

![PropSpace Hero](https://img.shields.io/badge/PropSpace-Real%20Estate%20Marketplace-1a3a5c?style=for-the-badge&logo=building&logoColor=gold)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)

---

## Screenshots

### Home Page
> Hero banner with search filters for city, property type, listing type, and price range.

### Login & Register
> JWT-secured authentication with salted & hashed passwords.

### Dashboard
> Personal listings management — create, edit, and delete your properties.

### Property Detail
> Image gallery with navigation, full property info, and owner actions.

---

## Features

### User & Authentication
- Register with unique email, username, and secure password (bcrypt salted & hashed)
- Login with JWT token generation (7-day expiry)
- Protected routes — unauthenticated users cannot access dashboard or profile
- Global Axios interceptor automatically attaches Bearer token to every request
- Auto-logout and redirect on token expiry (401 response)

### Account Management Dashboard
- Update profile name, phone number, and avatar image URL
- Change password with old password verification
- View personal listing statistics (total, for sale, for rent)

### Property Listings (CRUD)
| Operation | Access |
|-----------|--------|
| **Browse all listings** | Public (no login required) |
| **View property detail** | Public |
| **Create listing** | Authenticated users only |
| **Edit listing** | Author only |
| **Delete listing** | Author only |
| **My Listings dashboard** | Authenticated users only |

### Search & Filter
- Filter by **city** (case-insensitive search)
- Filter by **property type** (Apartment / House / Studio)
- Filter by **listing type** (For Sale / For Rent)
- Filter by **price range** (min and max)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS |
| **HTTP Client** | Axios with global interceptors |
| **Backend** | Node.js, Express |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs |
| **Validation** | express-validator |
| **Notifications** | react-hot-toast |
| **Icons** | lucide-react |

---

## Project Structure

```
PropSpace/
├── backend/
│   ├── server.js                   # Express app entry point
│   ├── .env                        # Environment variables
│   └── src/
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── models/
│       │   ├── User.js             # User schema (bcrypt hooks)
│       │   └── Property.js         # Property schema
│       ├── repositories/           # Data layer — DB queries only
│       │   ├── user.repository.js
│       │   └── property.repository.js
│       ├── services/               # Business logic layer
│       │   ├── auth.service.js
│       │   ├── property.service.js
│       │   └── user.service.js
│       ├── controllers/            # HTTP request/response handlers
│       │   ├── auth.controller.js
│       │   ├── property.controller.js
│       │   └── user.controller.js
│       ├── routes/                 # Route definitions
│       │   ├── auth.routes.js
│       │   ├── property.routes.js
│       │   └── user.routes.js
│       └── middleware/
│           ├── auth.middleware.js  # JWT protect guard
│           └── error.middleware.js # Global error handler
│
└── frontend/
    ├── index.html
    ├── vite.config.js              # Vite + API proxy config
    ├── tailwind.config.js          # Custom navy + gold palette
    └── src/
        ├── api/
        │   ├── axiosInstance.js    # Global interceptors
        │   ├── auth.api.js
        │   ├── property.api.js
        │   └── user.api.js
        ├── context/
        │   └── AuthContext.jsx     # Auth state + localStorage persistence
        ├── components/
        │   ├── Navbar.jsx
        │   ├── PropertyCard.jsx
        │   ├── SearchFilter.jsx
        │   ├── ProtectedRoute.jsx
        │   └── ImagePlaceholder.jsx
        └── pages/
            ├── Home.jsx            # Public feed + search
            ├── Login.jsx
            ├── Register.jsx
            ├── PropertyDetail.jsx  # Image gallery + owner actions
            ├── Dashboard.jsx       # My Listings + stats
            ├── CreateProperty.jsx
            ├── EditProperty.jsx
            └── Profile.jsx         # Update profile + change password
```

---

## Architecture

The backend follows a strict **3-layer architecture**:

```
Routes Layer        → Handles routing, params, and middleware triggers
    ↓
Controller Layer    → Parses request, calls service, returns response
    ↓
Service Layer       → Business logic, validation rules, calculations
    ↓
Repository Layer    → Direct database queries via Mongoose models
```

The frontend follows React best practices:
- **State Initialization** — `useEffect` runs network requests exactly once on mount
- **Memory Cleanups** — active flags on async effects prevent state updates on unmounted components
- **Global Interceptors** — Axios interceptor attaches auth tokens to all outbound requests

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) local instance **OR** a free [MongoDB Atlas](https://cloud.mongodb.com) cluster

### 1. Clone the repository
```bash
git clone https://github.com/Burn34-arch/Propspace.git
cd Propspace
```

### 2. Configure the backend
```bash
cd backend
```
Create a `.env` file (or edit the existing one):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/propspace
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```
> For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 3. Install dependencies & start servers

**Backend:**
```bash
cd backend
npm install
npm run dev        # nodemon — auto-restarts on file changes
```

**Frontend** (new terminal):
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
Visit **http://localhost:5173** in your browser.

---

## API Reference

### Auth
| Method | Endpoint | Body | Access |
|--------|----------|------|--------|
| POST | `/api/auth/register` | `{ username, email, password }` | Public |
| POST | `/api/auth/login` | `{ email, password }` | Public |

### Properties
| Method | Endpoint | Query / Body | Access |
|--------|----------|------|--------|
| GET | `/api/properties` | `?city=&propertyType=&listingType=&minPrice=&maxPrice=` | Public |
| GET | `/api/properties/:id` | — | Public |
| GET | `/api/properties/my-listings` | — | Private |
| POST | `/api/properties` | `{ title, description, price, city, country, propertyType, listingType, images[] }` | Private |
| PUT | `/api/properties/:id` | same as POST | Owner only |
| DELETE | `/api/properties/:id` | — | Owner only |

### Users
| Method | Endpoint | Body | Access |
|--------|----------|------|--------|
| GET | `/api/users/profile` | — | Private |
| PUT | `/api/users/profile` | `{ name, phone, avatar }` | Private |
| PUT | `/api/users/change-password` | `{ oldPassword, newPassword }` | Private |

---

## Color Theme

| Role | Color | Hex |
|------|-------|-----|
| Primary (Dark Navy) | ![#0a1a30](https://via.placeholder.com/12/0a1a30/0a1a30.png) | `#0a1a30` |
| Accent (Gold) | ![#e6a817](https://via.placeholder.com/12/e6a817/e6a817.png) | `#e6a817` |
| Background | ![#f8fafc](https://via.placeholder.com/12/f8fafc/f8fafc.png) | `#f8fafc` |
| Card Surface | ![#ffffff](https://via.placeholder.com/12/ffffff/ffffff.png) | `#ffffff` |
| Text Primary | ![#1e293b](https://via.placeholder.com/12/1e293b/1e293b.png) | `#1e293b` |

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/propspace` |
| `JWT_SECRET` | Secret key for signing JWT tokens | *(set a strong random string)* |
| `JWT_EXPIRES_IN` | JWT token lifespan | `7d` |

> **Security note:** Never commit your real `.env` file to version control. The `.gitignore` already excludes it.

---

## License

This project was built as a school assignment. Feel free to use it as a learning reference.
