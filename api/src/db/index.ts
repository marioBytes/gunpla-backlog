import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

export const query = (text: string, params?: string[]) => pool.query(text, params);
