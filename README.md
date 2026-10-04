# Verisight

Verisight is a legal, public-intelligence SaaS starter for ethical domain, company, email, and username discovery.

## Overview

The product is designed to support:
- public website intelligence
- company and domain metadata lookups
- email exposure checks from legal public sources
- username and profile footprint summaries
- secure SaaS onboarding and dashboard usage

## Important Legal Note

This project is intended for lawful, public, and consent-based data discovery only. It must not be used for unauthorized access, private data scraping, or any illegal activity.

## Project Structure

```text
verisight/
├── frontend/            # Next.js SaaS website and dashboard
├── backend/             # Express API and middleware
├── docs/                # Setup and product documentation
├── README.md            # Project overview and quick start
├── package.json         # Workspace scripts
└── .gitignore           # Ignore build and environment files
```

## Tech Stack

- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Auth: JWT + bcrypt
- Security: Helmet, CORS, rate limiting, validation
- Database: PostgreSQL-ready schema with deploy-ready structure
- Hosting: Vercel + Railway/Render

## Local Setup

### 1) Install workspace dependencies

```bash
npm install
```

### 2) Install frontend dependencies

```bash
cd frontend
npm install
```

### 3) Install backend dependencies

```bash
cd ../backend
npm install
cp .env.example .env
```

### 4) Run app

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## Core Pages

- `/` — Landing page
- `/login` — Login screen
- `/dashboard` — Search and intelligence dashboard
- `/pricing` — Product pricing page
- `/privacy` — Privacy policy placeholder
- `/terms` — Terms of service placeholder

## API

### Health

```bash
curl http://localhost:4000/api/health
```

### Register

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"demo@example.com","password":"SecurePass123"}'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"SecurePass123"}'
```

### Search

```bash
curl -X POST http://localhost:4000/api/search \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"query":"example.com","type":"domain"}'
```

## Production Recommendations

- Use PostgreSQL with Prisma or SQL queries in production
- Add Redis for rate-limiting and caching
- Add Sentry or equivalent monitoring
- Add payment integration with Razorpay or Stripe
- Add secure environment secrets management
- Publish privacy and legal pages before live launch
- Keep all public-source connectors documented and rate-limited

## Security Notes

- Validate all user inputs
- Never use this project for private data access
- Keep default JWT secrets out of code
- Restrict public endpoints using rate limiting
- Use HTTPS in production and strict CORS rules
