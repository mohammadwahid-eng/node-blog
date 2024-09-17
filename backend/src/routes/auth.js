import { Router } from 'express';
import { register, login, logout, profile } from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();


router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, profile);

export default router;