# Production Backend Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Installation

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your production values:

```env
DATABASE_URL=postgresql://user:password@host:5432/verisight_prod
PORT=4000
JWT_SECRET=your-long-random-secret-key-at-least-32-chars
CORS_ORIGIN=https://verisight.example.com
NODE_ENV=production
RATE_LIMIT_ENABLED=true
```

### 3. Set up PostgreSQL database

```bash
psql -U postgres -h localhost
```

```sql
CREATE DATABASE verisight_prod;
CREATE USER verisight WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE verisight_prod TO verisight;
```

### 4. Initialize database schema

```bash
psql -U verisight -d verisight_prod -h localhost -f src/db/schema.sql
```

### 5. Build TypeScript

```bash
npm run build
```

### 6. Start server

```bash
npm start
```

## Database Schema

The schema creates three main tables:

- `users` — User accounts with email, name, and hashed passwords
- `searches` — Search history with results and risk assessment
- `reports` — Generated reports and exports

## API Health Check

```bash
curl http://localhost:4000/api/health
```

## Deploy to Railway

1. Push to GitHub
2. Connect Railway to your repository
3. Set environment variables in Railway dashboard
4. Railway will auto-deploy

## Deploy to Render

1. Create Render account
2. Connect GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add PostgreSQL service
6. Set `DATABASE_URL` to Render PostgreSQL connection string

## Security Checklist

- ✅ Use strong JWT_SECRET (32+ random characters)
- ✅ Enable HTTPS in production
- ✅ Set strict CORS origin
- ✅ Enable rate limiting
- ✅ Use PostgreSQL with SSL
- ✅ Keep environment secrets out of version control
- ✅ Add monitoring and error tracking (Sentry)
- ✅ Enable database backups
- ✅ Use strong database passwords
