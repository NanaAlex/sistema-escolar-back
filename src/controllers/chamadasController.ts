import { Request, Response } from 'express';
import pool from '../database/connection';

export async function buscarChamada(req: Request, res: Response) {
    try {
        const data = req.query.data || new Date().toISOString().slice(0, 10);

        const sql = `
      SELECT 
        alunos.id,
        alunos.nome,
        COALESCE(chamadas.presente, true) AS presente
      FROM alunos
      LEFT JOIN chamadas 
        ON chamadas.aluno_id = alunos.id
        AND chamadas.data_chamada = ?
      ORDER BY alunos.nome ASC
    `;

        const [rows] = await pool.query(sql, [data]);

        res.json(rows);
    } catch (error: any) {
        console.log('ERRO AO SALVAR CHAMADA:', error);

        res.status(500).json({
            mensagem: 'Erro ao salvar chamada',
            error,
        });
    }
}

export async function salvarChamada(req: Request, res: Response) {
    try {
        const { data_chamada, descricao, alunos } = req.body;

        for (const aluno of alunos) {
            await pool.query(
                `
        INSERT INTO chamadas (aluno_id, data_chamada, presente, descricao)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          presente = VALUES(presente),
          descricao = VALUES(descricao)
        `,
                [aluno.id, data_chamada, aluno.presente, descricao]
            );
        }

        res.json({
            mensagem: 'Chamada salva com sucesso',
        });
    } catch (error) {
        console.log('ERRO AO SALVAR CHAMADA:', error);

        res.status(500).json({
            mensagem: 'Erro ao salvar chamada',
        });
    }
}