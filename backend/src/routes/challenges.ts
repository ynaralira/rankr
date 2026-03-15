import express from 'express';
import {
  getChallenges,
  getChallenge,
  submitChallenge,
} from '../controllers/challengeController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallenge);
router.post('/:id/submit', authenticate, submitChallenge);

export default router;

