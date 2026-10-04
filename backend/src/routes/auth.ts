import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { hashPassword, comparePassword, signToken } from '../lib/security.js';
import { db } from '../lib/database.js';
import crypto from 'crypto';

const router = Router();

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128)
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8)
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${errors}` });
    }

    const { email, name, password } = parsed.data;

    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = crypto.randomUUID();
    const now = new Date();

    await db.query(
      'INSERT INTO users (id, name, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, name, email, passwordHash, now, now]
    );

    const token = signToken({ sub: userId, email });

    return res.status(201).json({
      token,
      user: { id: userId, name, email }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${errors}` });
    }

    const { email, password } = parsed.data;

    // Fetch user
    const result = await db.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const passwordMatch = await comparePassword(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = signToken({ sub: user.id, email: user.email });

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

router.get('/me', async (req: Request & { user?: { sub: string; email: string } }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    const result = await db.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.user.sub]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

export default router;
