import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

export function initDatabase() {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set.');
  }

  pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
  });

  return pool;
}

export const db = {
  query: async (text: string, params?: unknown[]): Promise<QueryResult> => {
    const client = pool || initDatabase();
    return client.query(text, params);
  },
  getPool: () => pool || initDatabase()
};
