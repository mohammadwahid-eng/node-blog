import { Router } from 'express';
import { register, login, logout } from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authMiddleware, logout);

export default router;