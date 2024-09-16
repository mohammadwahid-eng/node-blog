import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { destroy, index, store, update } from '../controllers/CategoryController.js';

const router = Router();

router.get('/', authMiddleware, index);
router.post('/', authMiddleware, store);
router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, destroy);

export default router;