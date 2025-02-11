import { Router, Request, Response } from 'express';
import * as db from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const { rows } = await db.query('SELECT * FROM builds ORDER BY id ASC');

    res.json({ data: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    console.log(req);

    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM builds WHERE id = $1', [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ data: rows });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, grade, status, priority, user_id } = req.body;

    const result = await db.query(
      'INSERT INTO builds (name, grade, status, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, grade, status, priority, user_id]
    );

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create build, please try again' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, grade, status, priority } = req.body;

    const result = await db.query(
      'UPDATE builds SET name = $1, grade = $2, status = $3, priority = $4 WHERE id = $5 RETURNING *',
      [name, grade, status, priority, id]
    );

    res.json({ data: result.rows[0] });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM builds WHERE id = $1', [id]);

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export default router;
