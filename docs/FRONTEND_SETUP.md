# Frontend Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Update with your backend API URL:

```env
NEXT_PUBLIC_API_URL=https://api.verisight.example.com
```

### 3. Build for production

```bash
npm run build
```

### 4. Start server

```bash
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL
4. Click Deploy

## Deploy to Netlify

1. Push to GitHub
2. Connect Netlify to your repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variable: `NEXT_PUBLIC_API_URL`
6. Deploy

## Mobile Optimization

The frontend is already mobile-responsive with:
- Mobile-first Tailwind CSS design
- Touch-friendly buttons and inputs
- Responsive grid layouts
- Optimized for screens 320px and up

## Performance

- Next.js automatic code splitting
- Image optimization
- CSS optimization with Tailwind
- Font optimization with system fonts

## Security

- Middleware authentication checks
- JWT token in localStorage
- Secure CORS headers
- CSP headers from backend
