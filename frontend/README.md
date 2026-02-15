# BuildSafe AI – Frontend

Frontend application for **BuildSafe AI**, built using **Next.js 16** and **Tailwind CSS v4**.  
This application provides the user interface for authentication, risk analysis, dashboards, and interactive visualizations powered by the BuildSafe AI backend.

---

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **State & Data Fetching:** @tanstack/react-query
- **Forms:** react-hook-form
- **Animations:** framer-motion
- **UI Components:** Radix UI, cmdk, vaul
- **Charts:** recharts
- **Notifications:** react-hot-toast, sonner
- **Icons:** lucide-react
- **Theming:** next-themes
- **Type Safety:** TypeScript
- **Linting:** ESLint

---

## Features

- Modern App Router architecture (Next.js 16)
- Brutalist-inspired UI design system
- Anonymous + authenticated identity handling
- Token-based authentication
- Responsive layouts
- Interactive dashboards and charts
- Smooth animations and transitions
- Toast notifications and feedback states
- Optimized data fetching with React Query

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will run at:
```bash
http://localhost:3000
```

### Environment Variables
Create a .env.local file in the root directory and configure:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
Adjust the API URL according to your backend deployment.

---

## Development Notes
- Uses React 19 features and modern Next.js App Router.
- Tailwind CSS v4 configured with PostCSS.
- Designed for scalable UI architecture.
- Fully written in TypeScript.

---