# Verisight

A secure, responsive SaaS starter for a public intelligence platform.

## Product direction

Verisight is designed for ethical, consent-based public data discovery. This is a starter app for:
- domain intelligence
- company profile lookups
- email exposure checks
- username footprint checks
- public business research

## Important legal note

This project is for legal public intelligence and not for unauthorized hacking or access to private data. Use only public, lawful, and consented source material.

## Tech stack

- Next.js + TypeScript + Tailwind for the responsive website
- Express + TypeScript + JWT for the API
- Security with helmet, CORS, and rate limiting
- Clear folder separation for frontend and backend

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Health check:

```bash
curl http://localhost:4000/api/health
```

## Main routes

- Frontend: `/`
- Auth: `/login`
- Dashboard: `/dashboard`
- API: `/api/health`
- Search API: `/api/search`
- Auth API: `/api/auth/register`

## Production recommendations

- Add proper database layer (PostgreSQL/Prisma)
- Add Redis for rate limiting/caching
- Add Sentry and observability
- Add SSL, strict CORS, and environment validation
- Add legal TOS and privacy policy pages
