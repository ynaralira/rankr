import express from 'express';
import { getBadges, getUserBadges } from '../controllers/badgeController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getBadges);
router.get('/user/:userId', getUserBadges);

export default router;

