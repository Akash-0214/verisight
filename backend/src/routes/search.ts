import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const searchSchema = z.object({
  query: z.string().min(2).max(200),
  type: z.enum(['domain', 'email', 'username', 'company']).default('domain')
});

const mockResults = {
  domain: {
    summary: 'Domain is publicly registered and has valid DNS records.',
    risk: 'Low',
    evidence: ['WHOIS available', 'DNS resolves successfully', 'Public web presence detected']
  },
  email: {
    summary: 'Email appears in public breach data and public directory index.',
    risk: 'Moderate',
    evidence: ['Breach references found', 'Public profile match', 'Company directory entry present']
  },
  username: {
    summary: 'Username is visible across public social and software profiles.',
    risk: 'Low',
    evidence: ['GitHub public profile', 'Linked social presence', 'Public username listing found']
  },
  company: {
    summary: 'Company profile is publicly discoverable and categorized.',
    risk: 'Low',
    evidence: ['Public website found', 'Business metadata available', 'Company directory entry present']
  }
};

router.post('/', requireAuth, (req, res) => {
  const parsed = searchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid search payload.' });
  }

  const { type, query } = parsed.data;
  const result = mockResults[type];

  return res.json({
    type,
    query,
    summary: result.summary,
    risk: result.risk,
    evidence: result.evidence,
    timestamp: new Date().toISOString()
  });
});

export default router;
