import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import auth from './auth.js';
import categories from './categories.js';

const router = Router();

router.get('/me', authMiddleware, (req, res) => res.status(200).json(req.user));

router.use('/auth', auth)
router.use('/categories', categories)

export default router;