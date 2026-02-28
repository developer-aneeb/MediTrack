# MediTrack

Manual Prescription & Medication Reminder Management (MERN)

MediTrack is a full-stack project for managing prescriptions, user health profiles, and medicine reminders.  
It is **manual-first** (no AI features): users create and manage records directly.

---

## Highlights

- JWT-based authentication (register, login, current user)
- Forgot/reset password flow with email
- Prescription CRUD + share prescription by email
- Reminder CRUD + mark reminders as taken
- Profile management + profile image upload
- Medicine search using local data (`medicine.csv` + in-app dataset)

---

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- express-validator
- Nodemailer
- Multer (profile image upload)

### Frontend
- React (Vite)
- React Router
- React Bootstrap + Bootstrap
- Axios
- React Icons

---

## Monorepo Structure

```text
prescription_managment/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── vite.config.js
│   └── README.md
└── README.md
```

---

## Quick Start

### 1) Clone and install

```bash
git clone <your-repo-url>
cd prescription_managment
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=1000
JWT_SECRET=your_strong_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend defaults to Vite dev server (commonly `http://localhost:5173`) and backend API base is currently hardcoded in hooks to `http://localhost:1000/api`.

---

## API Surface (overview)

Base URL: `http://localhost:1000/api`

- `/auth`
  - `POST /register`
  - `POST /login`
  - `POST /forgot-password`
  - `POST /reset-password`
  - `POST /reset-password/:token`
  - `GET /me`
- `/prescriptions`
  - `GET /`
  - `GET /:id`
  - `POST /`
  - `PUT /:id`
  - `DELETE /:id`
  - `POST /:id/share`
- `/reminders`
  - `GET /`
  - `GET /:id`
  - `POST /`
  - `PUT /:id`
  - `PUT /:id/taken`
  - `DELETE /:id`
- `/profile`
  - `GET /`
  - `POST /`
  - `PUT /`
  - `POST /image`

Protected routes require:

```http
Authorization: Bearer <token>
```

---

## Development Notes

- `backend/.env` is ignored via `.gitignore`.
- Keep secrets out of commits and screenshots.
- If `.env` was ever committed, rotate credentials and remove from git history before publishing.
- For endpoint-level details, see:
  - `backend/routes/auth.js`
  - `backend/routes/prescriptions.js`
  - `backend/routes/reminders.js`
  - `backend/routes/profile.js`

---

## Scripts

### Backend

```bash
npm run dev
npm start
npm test
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## License

Add a `LICENSE` file before open-source release.
