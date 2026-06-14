import { Router } from 'express';
import { listarTurmas } from '../controllers/turmasController';

const router = Router();
router.get('/', listarTurmas);

export default router;