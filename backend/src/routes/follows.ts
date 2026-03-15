import express from 'express';
import {
  followUser,
  getFollowers,
  getFollowing,
} from '../controllers/followController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/:followingId', authenticate, followUser);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

export default router;

