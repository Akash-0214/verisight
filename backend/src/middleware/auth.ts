import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../lib/security.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid bearer token' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = verifyToken(token);
    (req as Request & { user?: { sub: string; email: string } }).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token expired or invalid' });
  }
}
