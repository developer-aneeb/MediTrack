# MediTrack Frontend

React + Vite client for MediTrack, covering authentication, prescriptions, reminders, profile, and medicine search.

---

## Stack

- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap + React Bootstrap
- React Icons

---

## Project Structure

```text
frontend/
├── public/
│   └── medicine.csv
├── src/
│   ├── components/
│   │   ├── AuthLayout.jsx
│   │   ├── PrescriptionForm.jsx
│   │   ├── ProfileFormField.jsx
│   │   └── common/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── home/
│   │   ├── HomePage.jsx
│   │   ├── Profile.jsx
│   │   ├── Reminders.jsx
│   │   ├── Search.jsx
│   │   └── medicines.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── usePrescriptions.js
│   │   ├── useProfile.js
│   │   └── useReminders.js
│   ├── prescription/
│   │   ├── Entry.jsx
│   │   └── History.jsx
│   ├── registration/
│   │   ├── Signup.jsx
│   │   ├── SignIn.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── Splash.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

---

## Run Locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

---

## API Integration

Current API base URL is hardcoded in hooks:

- `src/hooks/useAuth.js`
- `src/hooks/usePrescriptions.js`
- `src/hooks/useProfile.js`
- `src/hooks/useReminders.js`

Current value:

```js
const API_URL = 'http://localhost:1000/api';
```

If your backend runs elsewhere, update this value in those hook files.

---

## Feature Coverage

- Authentication screens: signup, signin, forgot password
- Protected routes for profile/prescriptions/reminders/search
- Prescription management (add/edit/delete/share)
- Reminder management (add/edit/delete/mark taken)
- Profile form + profile image upload
- Medicine search using local dataset (`medicines.js` + `public/medicine.csv`)

---

## Developer Notes

- Keep UI state in hooks/components consistent with backend responses.
- Ensure JWT token handling stays centralized in hooks.
- Prefer reusable components for forms and navigation.
- Avoid committing local env or build artifacts (covered by `.gitignore`).
