import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { destroy, index, show, store, update } from '../controllers/PostController.js';

const router = Router();

router.get('/', authMiddleware, index);
router.get('/:id', authMiddleware, show);
router.post('/', authMiddleware, store);
router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, destroy);

export default router;