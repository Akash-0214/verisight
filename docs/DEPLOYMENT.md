# Deployment Guide

## Quick Deploy (Railway + Vercel)

### Backend on Railway

1. Create Railway account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL plugin
4. Set environment variables (same as `.env`)
5. Deploy

### Frontend on Vercel

1. Create Vercel account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set `NEXT_PUBLIC_API_URL` to Railway backend URL
4. Deploy

## Environment Variables

### Backend (Railway)

```env
DATABASE_URL=<railway-postgres-connection-string>
JWT_SECRET=<generate-with-openssl-rand-hex-32>
CORS_ORIGIN=<vercel-frontend-url>
NODE_ENV=production
PORT=4000
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=<railway-backend-url>
```

## Custom Domain

### Frontend
- Vercel: Add domain in project settings
- Enable auto-renewal
- Update DNS records if needed

### Backend
- Railway: Add domain in deployment settings
- Point CNAME to Railway domain

## SSL/HTTPS

- Vercel: Automatic SSL
- Railway: Automatic SSL
- Configure strict CORS with your domain

## Monitoring

1. Add Sentry integration:
   ```bash
   npm install @sentry/nextjs @sentry/node
   ```

2. Get Sentry DSN from [sentry.io](https://sentry.io)

3. Add to backend index.ts:
   ```typescript
   import * as Sentry from '@sentry/node';
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```

## Backups

- PostgreSQL: Enable automated backups in Railway
- Frequency: Daily
- Retention: 30 days

## Health Checks

Setup uptime monitoring:
- Frontend: Check `https://verisight.example.com`
- Backend: Check `https://api.verisight.example.com/api/health`
- Use [UptimeRobot](https://uptimerobot.com) or similar

## Scaling

- Vercel: Auto-scales serverless functions
- Railway: Manual instance size scaling
- Database: Add read replicas if needed
- Cache: Add Redis for high-load scenarios
