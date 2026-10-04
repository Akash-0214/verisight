import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initDatabase } from './lib/database.js';
import { requireAuth } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/auth.js';
import searchRouter from './routes/search.js';

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT || 4000);

// Initialize database connection
try {
  initDatabase();
  console.log('Database connection pool initialized');
} catch (err) {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || '*').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  const start = Date.now();
  _res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.path} - ${_res.statusCode} (${duration}ms)`);
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a minute.' },
  skip: (req: Request) => {
    // Skip rate limiting for health check
    return req.path === '/api/health';
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' }
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'verisight-api', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`\n✅ Verisight API running on http://localhost:${port}`);
  console.log(`🐸 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Rate limiting: ${process.env.RATE_LIMIT_ENABLED !== 'false' ? 'enabled' : 'disabled'}`);
});
