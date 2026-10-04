import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { performPublicLookup } from '../services/public-data-service.js';
import { db } from '../lib/database.js';
import crypto from 'crypto';

const router = Router();

const searchSchema = z.object({
  query: z.string().trim().min(2).max(200),
  type: z.enum(['domain', 'email', 'username', 'company']).default('domain')
});

router.post(
  '/',
  requireAuth,
  async (req: Request & { user?: { sub: string; email: string } }, res: Response) => {
    try {
      const parsed = searchSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid search payload.' });
      }

      const { type, query } = parsed.data;

      // Perform the public lookup
      const result = await performPublicLookup(type, query);

      // Store search in database
      const searchId = crypto.randomUUID();
      const now = new Date();

      await db.query(
        `INSERT INTO searches (id, user_id, query_type, query_value, risk_level, summary, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [searchId, req.user?.sub, type, query, result.risk, result.summary, now]
      );

      return res.json({
        id: searchId,
        type,
        query,
        summary: result.summary,
        risk: result.risk,
        evidence: result.evidence,
        timestamp: now.toISOString(),
        legalNotice: 'Results are based on lawful public-source intelligence only.'
      });
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).json({ error: 'Unable to process the lookup.' });
    }
  }
);

router.get(
  '/history',
  requireAuth,
  async (req: Request & { user?: { sub: string; email: string } }, res: Response) => {
    try {
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = Number(req.query.offset) || 0;

      const result = await db.query(
        `SELECT id, query_type, query_value, risk_level, summary, created_at
         FROM searches
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [req.user?.sub, limit, offset]
      );

      return res.json({
        searches: result.rows,
        total: result.rows.length,
        limit,
        offset
      });
    } catch (error) {
      console.error('History error:', error);
      return res.status(500).json({ error: 'Unable to fetch history.' });
    }
  }
);

router.get(
  '/:searchId',
  requireAuth,
  async (req: Request & { user?: { sub: string; email: string } }, res: Response) => {
    try {
      const { searchId } = req.params;

      const result = await db.query(
        `SELECT id, query_type, query_value, risk_level, summary, created_at
         FROM searches
         WHERE id = $1 AND user_id = $2`,
        [searchId, req.user?.sub]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Search not found.' });
      }

      return res.json({ search: result.rows[0] });
    } catch (error) {
      console.error('Get search error:', error);
      return res.status(500).json({ error: 'Unable to fetch search.' });
    }
  }
);

export default router;
