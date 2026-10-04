import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { performPublicLookup } from '../services/public-data-service.js';

const router = Router();

const searchSchema = z.object({
  query: z.string().trim().min(2).max(200),
  type: z.enum(['domain', 'email', 'username', 'company']).default('domain')
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const parsed = searchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid search payload.' });
  }

  const { type, query } = parsed.data;

  try {
    const result = await performPublicLookup(type, query);

    return res.json({
      type,
      query,
      summary: result.summary,
      risk: result.risk,
      evidence: result.evidence,
      timestamp: new Date().toISOString(),
      legalNotice: 'Results are based on lawful public-source intelligence only.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process the lookup.' });
  }
});

export default router;
