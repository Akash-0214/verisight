# Verisight

Verisight is a public intelligence SaaS product for legal, ethical, and consent-based public data discovery.

Features:
- Responsive website and mobile-friendly dashboard
- Search for domains, emails, usernames, and company profiles
- Public intelligence result cards with risk insights
- Secure authentication
- Rate-limited API
- Clean SaaS landing page and product UI

Tech stack:
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Auth: JWT + bcrypt
- Security: Helmet, CORS, rate limiting, input validation
- Database: PostgreSQL-ready schema with SQLite dev support possible

Folder layout:
- `frontend/` — responsive website
- `backend/` — API service
- `docs/` — architecture and onboarding docs

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Security notes
- Use JWT access tokens
- Verify all incoming request payloads with validation
- Rate limit public endpoints
- Never scrape private or protected data
- Add legal disclaimers and TOS for public data collection

## Production recommendations
- Use PostgreSQL in production
- Use Redis for cache and rate limit backends
- Add Sentry monitoring
- Use HTTPS and strict CORS policies
- Keep secrets in environment variables only
