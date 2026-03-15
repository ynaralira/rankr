import express from 'express';
import { getReferralInfo, getTopRecruiters } from '../controllers/referralController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticate, getReferralInfo);
router.get('/leaderboard', authenticate, getTopRecruiters);

export default router;

