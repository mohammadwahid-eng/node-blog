import { Router } from 'express';
import { register, login, logout } from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json(req.user);
});

// logout
router.delete('/auth/logout', authMiddleware, logout);

// auth
router.post('/auth/register', register);
router.post('/auth/login', login);

export default router;