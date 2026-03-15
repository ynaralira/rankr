import express from 'express';
import {
  getProfile,
  updateProfile,
  getTrendingDevelopers,
  getRecommendedDevelopers,
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/trending', authenticate, getTrendingDevelopers);
router.get('/recommended', authenticate, getRecommendedDevelopers);
router.get('/:username', getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;

