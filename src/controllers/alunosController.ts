import { Request, Response } from 'express';
import pool from '../database/connection';

export async function listarAlunos(req: Request, res: Response) {
  try {
    const [rows] = await pool.query(`
      SELECT id, nome
      FROM alunos
      ORDER BY nome ASC
    `);

    res.json(rows);
  } catch (error: any) {
    console.log('ERRO AO LISTAR ALUNOS:', error);

    res.status(500).json({
      mensagem: 'Erro ao listar alunos',
      erro: error.message,
      codigo: error.code,
      tabela: error.sqlMessage,
    });
  }
}

export async function criarAluno(req: Request, res: Response) {
  try {
    const { nome, login, senha } = req.body;

    const sql = `
      INSERT INTO alunos (nome, login, senha)
      VALUES (?, ?, ?)
    `;

    const [result]: any = await pool.query(sql, [
      nome,
      login,
      senha,
    ]);

    res.status(201).json({
      id: result.insertId,
      nome,
      login,
    });
  } catch (error: any) {
    console.log('ERRO AO CRIAR ALUNO:', error);

    res.status(500).json({
      mensagem: 'Erro ao criar aluno',
      erro: error.message,
      codigo: error.code,
      tabela: error.sqlMessage,
    });
  }
}