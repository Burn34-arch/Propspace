# PropSpace — Startup Guide

## Prerequisites
- Node.js v18+ installed
- MongoDB running locally on port 27017
  (Download: https://www.mongodb.com/try/download/community)

---

## 1. Start the Backend

```bash
cd backend
npm run dev        # uses nodemon for auto-reload
# or
npm start          # production mode
```

Backend runs at: http://localhost:5000

---

## 2. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Environment Variables (backend/.env)

| Variable        | Default Value                                 |
|-----------------|-----------------------------------------------|
| PORT            | 5000                                          |
| MONGO_URI       | mongodb://localhost:27017/propspace           |
| JWT_SECRET      | propspace_super_secret_jwt_key_2024           |
| JWT_EXPIRES_IN  | 7d                                            |

> Change JWT_SECRET to something random and strong before deploying!

---

## API Endpoints

### Auth
| Method | Route                  | Access  |
|--------|------------------------|---------|
| POST   | /api/auth/register     | Public  |
| POST   | /api/auth/login        | Public  |

### Properties
| Method | Route                       | Access     |
|--------|-----------------------------|------------|
| GET    | /api/properties             | Public     |
| GET    | /api/properties/:id         | Public     |
| GET    | /api/properties/my-listings | Private    |
| POST   | /api/properties             | Private    |
| PUT    | /api/properties/:id         | Owner Only |
| DELETE | /api/properties/:id         | Owner Only |

### Users
| Method | Route                      | Access  |
|--------|----------------------------|---------|
| GET    | /api/users/profile         | Private |
| PUT    | /api/users/profile         | Private |
| PUT    | /api/users/change-password | Private |
