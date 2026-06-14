import { Router } from 'express';
import { listarAlunos, criarAluno } from '../controllers/alunosController';

const router = Router();

router.get('/', listarAlunos);
router.post('/', criarAluno);

export default router;