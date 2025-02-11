import { Router, Request, Response } from 'express';
import * as db from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { rows } = await db.query('SELECT * FROM users ORDER BY id ASC');

    res.json({ data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ data: rows });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const { rows } = await db.query('INSERT INTO users (name, email) values ($1, $2) RETURNING *', [name, email]);

    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body

    const { rows } = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);

    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

export default router;
