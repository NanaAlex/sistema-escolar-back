import { Request, Response } from 'express';
import pool from '../database/connection';

export async function buscarChamada(req: Request, res: Response) {
  const { data, turma } = req.query;

  if (!data || !turma) {
    return res.status(400).json({ error: 'Data e turma são obrigatórios' });
  }

  const sql = `
    SELECT 
      alunos.id, 
      alunos.nome, 
      COALESCE(chamadas.presente, true) AS presente
    FROM alunos
    LEFT JOIN chamadas 
      ON chamadas.aluno_id = alunos.id 
      AND chamadas.data_chamada = ?
    WHERE alunos.turma_id = ?
    ORDER BY alunos.nome ASC
  `;

  try {
    const [rows] = await pool.query(sql, [data, turma]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar chamada' });
  }
}

export async function salvarChamada(req: Request, res: Response) {
  const { data_chamada, descricao, alunos, turma_id } = req.body;

  if (!data_chamada || !alunos || !turma_id) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    for (const aluno of alunos) {
      await pool.query(
        `INSERT INTO chamadas (aluno_id, data_chamada, presente, descricao, turma_id)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           presente = VALUES(presente),
           descricao = VALUES(descricao),
           turma_id = VALUES(turma_id)`,
        [aluno.id, data_chamada, aluno.presente, descricao, turma_id]
      );
    }
    res.json({ mensagem: 'Chamada salva com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar chamada' });
  }
}