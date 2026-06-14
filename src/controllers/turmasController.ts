import { Request, Response } from 'express';
import pool from '../database/connection';

export async function listarTurmas(req: Request, res: Response) {
  try {
    const [rows] = await pool.query(
      'SELECT id, nome, serie FROM turmas ORDER BY serie, nome'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar turmas' });
  }
}