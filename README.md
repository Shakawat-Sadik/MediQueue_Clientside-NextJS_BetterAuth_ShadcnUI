# MediQueue

MediQueue is a doctor appointment booking web application built with Next.js. It lets patients browse doctors, view detailed doctor profiles, create appointments, and manage their bookings from a protected dashboard.

![MediQueue desktop cover](public/readme/mediqueue-desktop-cover.png)

![MediQueue mobile cover](public/readme/mediqueue-mobile-cover.png)

## Features

- Responsive landing page with hero, statistics, top doctors, department highlights, testimonials, and call-to-action sections
- Doctor listing page with search/filter/sort support through the backend API
- Dynamic doctor profile pages with metadata generation
- Protected appointment booking flow
- User dashboard for viewing, updating, and deleting bookings
- User profile page
- Email/password authentication and Google social login with Better Auth
- Three-layer route and data protection using proxy middleware, auth guards, and JWT-secured server actions
- Light/dark theme support with `next-themes`
- Shadcn-style UI components, Tailwind CSS, Sonner toasts, and Lucide icons

## Tech Stack

- **Framework:** Next.js 16, React 19
- **Styling:** Tailwind CSS 4, Shadcn UI components
- **Authentication:** Better Auth, Better Auth MongoDB adapter, JWT plugin
- **Backend:** ExpressJS, JWT, MongoDB
- **Database/Auth Store:** MongoDB
- **UI/UX:** Lucide React, Sonner, Motion, Radix/Base UI primitives
- **Package Manager:** pnpm

## Project Structure

```txt
src/
  app/
    api/auth/[...all]/route.js      # Better Auth API route
    auth/login/page.jsx             # Login page
    auth/sign-up/page.jsx           # Registration page
    book/[slug]/page.jsx            # Protected appointment booking page
    dashboard/page.jsx              # Protected bookings dashboard
    dashboard/profile/page.jsx      # Profile page
    doctors/page.jsx                # Doctors listing page
    doctors/[slug]/page.jsx         # Doctor details page
    layout.js                       # Root layout
    page.js                         # Home page
  components/
    booking/                        # Booking form components
    dashboard/                      # Booking dashboard components
    doctors/                        # Doctor listing/detail components
    home/                           # Home page sections
    ui/                             # Reusable UI components
  lib/
    action/                         # Server actions and API wrappers
    auth.js                         # Better Auth server config
    auth-client.js                  # Better Auth client config
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm
- MongoDB connection string
- Running MediQueue backend/API server
- Google OAuth credentials, if Google login is enabled

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
SERVER_URL=http://localhost:5000
REMOTE_SERVER_URL=https://your-production-api.example.com
NEXT_PUBLIC_REMOTE_SERVER_URL=https://your-production-api.example.com

AUTH_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediqueue
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Notes:

- `SERVER_URL` is used during local development for backend API requests.
- `REMOTE_SERVER_URL` is used in production server-side API requests.
- `NEXT_PUBLIC_REMOTE_SERVER_URL` is used where the frontend needs a public production API URL.
- `AUTH_DB_URI` is used by Better Auth to store sessions/users in MongoDB.
- `BETTER_AUTH_URL` should match the app URL, for example `http://localhost:3000` locally.

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

- `pnpm dev` starts the Next.js development server.
- `pnpm build` creates a production build.
- `pnpm start` runs the production server after building.
- `pnpm lint` runs ESLint.

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/doctors` | Browse all doctors |
| `/doctors/[slug]` | View a doctor profile |
| `/book/[slug]` | Book an appointment with a doctor |
| `/dashboard` | View and manage bookings |
| `/dashboard/profile` | View and update profile |
| `/auth/login` | Login |
| `/auth/sign-up` | Register |

## Authentication and Protection Flow

Authentication is powered by Better Auth. The app supports:

- Email and password login
- Email and password registration
- Google OAuth login
- JWT token generation for authenticated backend requests

MediQueue uses three layers of protection across the frontend and backend API:

| Layer | Responsibility |
| --- | --- |
| `proxy.js` / middleware layer | Reads the auth cookie, redirects unauthenticated users instantly, prevents protected-page flash, protects `/book` and `/dashboard`, and sends users back after auth redirects |
| `AuthGuard` component | Reads the full session, shows loading while auth state is resolving, provides the user object to user-specific UI, and works as a backup safety net |
| Server actions in `action.js` | Generate a JWT, attach it to protected Express API calls, and make sure backend operations are performed only after token verification |

Protected frontend routes:

- `/dashboard`
- `/book/:slug`

Unauthenticated users are redirected to `/auth/login` with a `redirect` query parameter.

On the backend, the ExpressJS API verifies the JWT before allowing protected appointment and review operations. MongoDB operations are secured behind that JWT verification layer.

## Backend API Expectations

This client expects a separate ExpressJS backend API connected to MongoDB, with endpoints similar to:

```txt
GET    /doctors
GET    /doctors/:slug
GET    /appointments?email=user@example.com
GET    /appointments/:id
POST   /appointments
PATCH  /appointments/:id
DELETE /appointments/:id
POST   /reviews
```

Protected appointment and review routes receive an authorization header:

```txt
Authorization: Bearer <jwt-token>
```

## Deployment

The app can be deployed to Vercel or any platform that supports Next.js.

Before deploying, configure these production environment variables:

- `REMOTE_SERVER_URL`
- `NEXT_PUBLIC_REMOTE_SERVER_URL`
- `AUTH_DB_URI`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Then build the project:

```bash
pnpm build
```
