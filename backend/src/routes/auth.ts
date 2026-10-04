import { Router } from 'express';
import { z } from 'zod';
import { hashPassword, comparePassword, signToken } from '../lib/security.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80),
  password: z.string().min(8).max(128)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

const demoUsers = new Map<string, { id: string; email: string; name: string; passwordHash: string }>();

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input payload.' });
  }

  const { email, name, password } = parsed.data;

  if (demoUsers.has(email)) {
    return res.status(409).json({ error: 'Email already registered.' });
  }

  const passwordHash = await hashPassword(password);
  const user = { id: crypto.randomUUID(), email, name, passwordHash };
  demoUsers.set(email, user);

  return res.status(201).json({
    token: signToken({ sub: user.id, email: user.email }),
    user: { id: user.id, name: user.name, email: user.email }
  });
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid login data.' });
  }

  const user = demoUsers.get(parsed.data.email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const match = await comparePassword(parsed.data.password, user.passwordHash);

  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  return res.json({
    token: signToken({ sub: user.id, email: user.email }),
    user: { id: user.id, name: user.name, email: user.email }
  });
});

export default router;
