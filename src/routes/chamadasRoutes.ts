import { Router } from 'express';
import { buscarChamada, salvarChamada } from '../controllers/chamadasController';

const router = Router();

router.get('/', buscarChamada);
router.post('/salvar', salvarChamada);

export default router;