import { Router } from 'express';
import auth from './auth.js';
import categories from './categories.js';
import tags from './tags.js';
import posts from './posts.js';

const router = Router();

router.use('/auth', auth)
router.use('/categories', categories)
router.use('/tags', tags)
router.use('/posts', posts)

export default router;