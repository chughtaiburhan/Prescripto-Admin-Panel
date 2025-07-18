# Prescripto Admin Panel

## Overview
This is the admin panel for the Prescripto platform. It allows administrators to manage doctors, appointments, and users, as well as monitor platform statistics and perform administrative actions.

## Features
- Admin authentication
- Doctor management (add, edit, delete)
- Appointment management
- User management
- Dashboard with statistics
- Image and availability management
- Responsive UI

## Folder Structure
```
admin-panel/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, and static JS assets
│   ├── component/         # Reusable React components
│   ├── pages/             # Page-level React components (Admin)
│   ├── context/           # React context providers
│   ├── utils/             # Utility functions
│   ├── index.css          # Global styles
│   └── main.jsx           # App entry point
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will be available at `http://localhost:5173` by default.

## Tech Stack
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Toastify

## Environment Variables
Create a `.env` file in the root with:
```
VITE_BACKEND_URL=<your-backend-url>
VITE_FRONTEND_URL=<your-frontend-url>
```

**Required for Vercel Deployment:**
- `VITE_BACKEND_URL`: Your backend API URL (e.g., `https://your-backend.vercel.app/api`)
- `VITE_FRONTEND_URL`: Your main frontend URL (e.g., `https://prescripto-frontend.vercel.app`)

## Deployment
- Build for production:
  ```bash
  npm run build
  ```
- Deploy the `dist/` folder to your preferred static hosting (Vercel, Netlify, etc.)

## How to Contribute
1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

## Contact
For questions or support, open an issue or contact the maintainer.

---

### GitHub Short Description
> Admin panel for Prescripto: manage doctors, appointments, users, and platform statistics.
